using System.Net;
using Polly;
using Polly.Retry;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public static class SpotifyHttpClientBuilderExtensions
{
    public static IHttpClientBuilder AddExponentialRetryPolicy(this IHttpClientBuilder builder)
    {
        return builder
            .SetHandlerLifetime(TimeSpan.FromMinutes(value: 2))
            .AddPolicyHandler(GetRetryPolicy());
    }

    private static AsyncRetryPolicy<HttpResponseMessage> GetRetryPolicy()
    {
        return Policy<HttpResponseMessage>.Handle<HttpRequestException>()
            .OrResult(response =>
            {
                var code = response.StatusCode;

                // We exclude 502 status code from retries, as it may occur on some requests (e.g. UpdatePlayback)
                // and typically indicates an error in our request rather than a transient issue.
                if (code == HttpStatusCode.BadGateway) return false;

                return code >= HttpStatusCode.InternalServerError;
            })
            .WaitAndRetryAsync(retryCount: 3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(x: 3, retryAttempt)));
    }
}
