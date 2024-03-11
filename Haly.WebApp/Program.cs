using System.Text.Json.Serialization;
using FluentValidation;
using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.CurrentUser.UpdatePlaylists;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.Features.Swagger;
using Haly.WebApp.Features.Validation;
using Haly.WebApp.Hubs;
using Haly.WebApp.ThirdPartyApis.Genius;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using Microsoft.OpenApi.Models;
using Refit;

// Configure Mapster and validate that our mappings are correct
TypeAdapterConfig.GlobalSettings.Scan(typeof(Program).Assembly);
TypeAdapterConfig.GlobalSettings.Compile();

// Configure Services
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<ISpotifyEndpointCollector, SpotifyEndpointCollector>();
builder.Services.AddHttpClient<ISpotifyService, SpotifyService>().AddExponentialRetryPolicy();
builder.Services.AddHttpClient<ISpotifyPlaybackService, SpotifyPlaybackService>().AddExponentialRetryPolicy();

builder.Services.AddRefitClient<IGeniusApi>()
    .ConfigureHttpClient(c =>
    {
        var options = builder.Configuration.GetSection(GeniusOptions.Key).Get<GeniusOptions>()!;
        c.BaseAddress = new Uri(options.BaseUri);
    });

builder.Services.AddSingleton<CurrentUserStore>();
builder.Services.AddSingleton<ValidateAccessTokenFilterService>();

builder.Services.AddTransient<ITotalDurationService, TotalDurationService>();
builder.Services.AddTransient<IDateOnlyService, DateOnlyService>();

builder.Services.AddSignalR();

// Configure MediatR
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<Program>();
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
// Configure FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddControllers()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Haly API",
        Description =
            "An ASP.NET Core Web API that adds quality of life improvements to Spotify and helps with music exploration",
    });
    options.CustomOperationIds(description => description.ActionDescriptor.RouteValues["action"]);
    options.SchemaFilter<RequireNonNullablePropertiesSchemaFilter>();
    options.EnableAnnotations();
    options.SupportNonNullableReferenceTypes();
    options.UseAllOfToExtendReferenceSchemas();

    options.DocumentFilter<TagOrderFilter>();
    options.OperationFilter<CallsSpotifyApiFilter>();
});

builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
}));

builder.AddLibraryContext();

// Configure App
var app = builder.Build();
app.UseCors();

app.MapControllers();
app.MapHub<MessageHub>("/hub");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => { options.EnableTryItOutByDefault(); });
}

if (app.Environment.IsProduction())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.ApplyMigrations();
app.Run();
