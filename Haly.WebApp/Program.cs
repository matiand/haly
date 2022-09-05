using Haly.WebApp.Controllers;
using Haly.WebApp.Data;
using Haly.WebApp.Features.XSpotifyToken;
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
builder.Services.AddSingleton<SpotifyAccessToken>();
builder.Services.AddTransient<ISpotifyService, SpotifyService>();
builder.Services.AddControllers();
builder.Services.AddSignalR();

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
    options.OperationFilter<XSpotifyTokenHeaderFilter>();
    options.SchemaFilter<RequireNonNullablePropertiesSchemaFilter>();
    options.EnableAnnotations();
    options.SupportNonNullableReferenceTypes();
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
app.UseRetrieveSpotifyAccessToken();

app.MapControllers();
app.MapHub<PlaylistHub>("/hubs/playlist");


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
