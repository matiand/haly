using Polly;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public static class SpotifyHttpClientBuilderExtensions
{
    public static IHttpClientBuilder AddExponentialRetryPolicy(this IHttpClientBuilder builder)
    {
        return builder
            // Increase handler lifetime to 3 minutes, so we are sure it survives our retries
            .SetHandlerLifetime(TimeSpan.FromMinutes(value: 3))
            .AddTransientHttpErrorPolicy(policyBuilder => policyBuilder.WaitAndRetryAsync(new[]
        {
            TimeSpan.FromSeconds(value: 2),
            TimeSpan.FromSeconds(value: 4),
            TimeSpan.FromSeconds(value: 8),
            TimeSpan.FromSeconds(value: 16),
            TimeSpan.FromSeconds(value: 32),
        }));
    }
}
