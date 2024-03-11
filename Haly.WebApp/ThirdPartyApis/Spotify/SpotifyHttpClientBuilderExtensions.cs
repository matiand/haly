using System.Net;
using Polly;
using Polly.Retry;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public static class SpotifyHttpClientBuilderExtensions
{
    public static IHttpClientBuilder AddExponentialRetryPolicy(this IHttpClientBuilder builder)
    {
        return builder
            // Increase handler lifetime to 3 minutes, so we are sure it survives our retries
            .SetHandlerLifetime(TimeSpan.FromMinutes(value: 3))
            .AddPolicyHandler(GetRetryPolicy());
    }

    private static AsyncRetryPolicy<HttpResponseMessage> GetRetryPolicy()
    {
        return Policy<HttpResponseMessage>.Handle<HttpRequestException>()
            .OrResult(response =>
            {
                var code = response.StatusCode;

                // We exclude 502 status code from retries, as it may occur on specific Player
                // endpoints and typically indicates an error in our request rather than a transient
                // issue.
                if (code == HttpStatusCode.BadGateway) return false;

                return code >= HttpStatusCode.InternalServerError || code == HttpStatusCode.RequestTimeout;
            })
            .WaitAndRetryAsync(retryCount: 5, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
    }
}
