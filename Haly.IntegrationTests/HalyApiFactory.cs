using Haly.WebApp;
using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using NSubstitute;

namespace Haly.IntegrationTests;

public class HalyApiFactory : WebApplicationFactory<IApiMarker>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        // todo: this won't work long term, I guess
        Environment.SetEnvironmentVariable("SKIP_DATABASE_MIGRATIONS", "true");

        // Disable sentry integration for tests.
        builder.UseSentry(options => { options.Dsn = ""; });
    }
}

public static class SlimHalyApiFactoryExtensions
{
    public static WebApplicationFactory<IApiMarker> AuthenticateWith(this WebApplicationFactory<IApiMarker> factory,
        PrivateUser user)
    {
        return factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.RemoveAll<ICurrentUserStore>();
                services.AddSingleton<ICurrentUserStore>(_ =>
                {
                    var meStore = Substitute.For<ICurrentUserStore>();
                    meStore.Token.Returns("foo");
                    meStore.User.Returns(user.Adapt<PrivateUserDto>());

                    return meStore;
                });
            });
        });
    }

    public static WebApplicationFactory<IApiMarker> MockSpotifyService(this WebApplicationFactory<IApiMarker> factory,
        Action<ISpotifyService> configureMock)
    {
        return factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                var spotifyService = Substitute.For<ISpotifyService>();
                configureMock(spotifyService);

                services.RemoveAll<ISpotifyService>();
                services.AddTransient<ISpotifyService>(_ => spotifyService);
            });
        });
    }
}
