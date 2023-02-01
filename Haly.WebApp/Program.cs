using System.Text.Json.Serialization;
using FluentValidation;
using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.Swagger;
using Haly.WebApp.Features.Validation;
using Haly.WebApp.HostedServices;
using Haly.WebApp.Hubs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

// Configure Mapster
TypeAdapterConfig.GlobalSettings.Scan(typeof(Program).Assembly);

// Configure Services
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddMediatR(typeof(Program));

builder.Services.AddSingleton<CurrentUserStore>();
builder.Services.AddSingleton<ValidateCurrentUserStoreFilterService>();
builder.Services.AddSingleton<UpdateCurrentUserStoreFilterService>();

builder.Services.AddTransient<ISpotifyService, SpotifyService>();
builder.Services.AddSignalR();

// Don't crash on failure inside background services
builder.Services.AddHostedService<RefetchPlaylistTracksService>();
builder.Services.Configure<HostOptions>(options =>
    options.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

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
    opts.UseNpgsql(builder.Configuration.GetConnectionString("LibraryConnection"));
    if (builder.Environment.IsDevelopment())
    {
        opts.EnableSensitiveDataLogging();
    }
});

// Configure App
var app = builder.Build();
app.UseCors();

app.MapControllers();
app.MapHub<MessageHub>("/hubs/playlist");

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
