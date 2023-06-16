using System.Text.Json.Serialization;
using FluentValidation;
using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.Jobs;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.Features.Swagger;
using Haly.WebApp.Features.Validation;
using Haly.WebApp.Hubs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

// CA1852 Type 'Program' can be sealed because it has no subtypes in its containing assembly and is not externally visible
#pragma warning disable CA1852

// Configure Mapster and validate that our mappings are correct
TypeAdapterConfig.GlobalSettings.Scan(typeof(Program).Assembly);
TypeAdapterConfig.GlobalSettings.Compile();

// Configure Services
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<ISpotifyEndpointCollector, SpotifyEndpointCollector>();
builder.Services.AddHttpClient<ISpotifyService, SpotifyService>().AddExponentialRetryPolicy();

builder.Services.AddSingleton<CurrentUserStore>();
builder.Services.AddSingleton<ValidateAccessTokenFilterService>();

builder.Services.AddTransient<ITotalDurationService, TotalDurationService>();

builder.Services.AddSignalR();
builder.Services.AddHostedService<RefetchPlaylistTracksService>();

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

builder.Services.AddDbContext<LibraryContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("LibraryConnection")!,
        connectionOpts => connectionOpts.EnableRetryOnFailure());

    if (builder.Environment.IsDevelopment())
    {
        opts.EnableSensitiveDataLogging();
    }
});

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
