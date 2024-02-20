using System;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http;
using Newtonsoft.Json;

// ReSharper disable once CheckNamespace
namespace Haly.GeneratedClients
{
    public partial class GeneratedSpotifyClient
    {
        public GeneratedSpotifyClient(HttpClient httpClient, bool throwDeserializationErrors)
        {
            _httpClient = httpClient;

            var settings = new JsonSerializerSettings();
            if (!throwDeserializationErrors)
            {
                settings.Error += (_, args) =>
                {
                    Console.WriteLine(
                        $"Failed Deserialization of type: {args.CurrentObject}; property: {args.ErrorContext.Member}");
                    Console.WriteLine($"{args.ErrorContext.Error.Message}\n");
                    args.ErrorContext.Handled = true;
                };
            }

            _settings = new Lazy<JsonSerializerSettings>(settings);
        }

        /// <summary>
        /// Override for SearchAsync method. This method allows for more sophisticated control over the query type.
        /// </summary>
        /// <remarks>
        /// Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks
        /// <br/>that match a keyword string.&lt;br /&gt;
        /// </remarks>
        /// <returns>Search response</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        [SuppressMessage("ReSharper", "ConditionIsAlwaysTrueOrFalseAccordingToNullableAPIContract")]
        public async System.Threading.Tasks.Task<Response13> SearchAsyncOverride(string q, SpotifySearchQueryType qType, string? market = null, int? limit = null, int? offset = null, Include_external? includeExternal = null, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            if (q == null)
                throw new ArgumentNullException(nameof(q));

            var urlBuilder = new System.Text.StringBuilder();
            urlBuilder.Append(BaseUrl != null ? BaseUrl.TrimEnd(trimChar: '/') : "").Append("/search?");
            urlBuilder.Append(Uri.EscapeDataString("q") + "=").Append(Uri.EscapeDataString(ConvertToString(q, System.Globalization.CultureInfo.InvariantCulture))).Append("&");
            urlBuilder.Append(Uri.EscapeDataString("type") + "=").Append(Uri.EscapeDataString(ConvertToString(qType, System.Globalization.CultureInfo.InvariantCulture))).Append("&");
            if (market != null)
            {
                urlBuilder.Append(Uri.EscapeDataString("market") + "=").Append(Uri.EscapeDataString(ConvertToString(market, System.Globalization.CultureInfo.InvariantCulture))).Append("&");
            }
            if (limit != null)
            {
                urlBuilder.Append(Uri.EscapeDataString("limit") + "=").Append(Uri.EscapeDataString(ConvertToString(limit, System.Globalization.CultureInfo.InvariantCulture))).Append("&");
            }
            if (offset != null)
            {
                urlBuilder.Append(Uri.EscapeDataString("offset") + "=").Append(Uri.EscapeDataString(ConvertToString(offset, System.Globalization.CultureInfo.InvariantCulture))).Append("&");
            }
            if (includeExternal != null)
            {
                urlBuilder.Append(Uri.EscapeDataString("include_external") + "=").Append(Uri.EscapeDataString(ConvertToString(includeExternal, System.Globalization.CultureInfo.InvariantCulture))).Append("&");
            }
            urlBuilder.Length--;

            var client = _httpClient;
            var disposeClient = false;
            try
            {
                using var request = new HttpRequestMessage();
                request.Method = new HttpMethod("GET");
                request.Headers.Accept.Add(System.Net.Http.Headers.MediaTypeWithQualityHeaderValue.Parse("application/json"));

                PrepareRequest(client, request, urlBuilder);

                var url = urlBuilder.ToString();
                request.RequestUri = new Uri(url, UriKind.RelativeOrAbsolute);

                PrepareRequest(client, request, url);

                var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken).ConfigureAwait(continueOnCapturedContext: false);
                var disposeResponse = true;
                try
                {
                    var headers = System.Linq.Enumerable.ToDictionary(response.Headers, h => h.Key, h => h.Value);
                    if (response.Content is { Headers: { } })
                    {
                        foreach (var item in response.Content.Headers)
                            headers[item.Key] = item.Value;
                    }

                    ProcessResponse(client, response);

                    var status = (int)response.StatusCode;
                    if (status == 200)
                    {
                        var objectResponse = await ReadObjectResponseAsync<Response13>(response, headers, cancellationToken).ConfigureAwait(continueOnCapturedContext: false);
                        if (objectResponse.Object == null)
                        {
                            throw new ApiException("Response was null which was not expected.", status, objectResponse.Text, headers, innerException: null);
                        }
                        return objectResponse.Object;
                    }
                    else
                    if (status == 401)
                    {
                        var objectResponse = await ReadObjectResponseAsync<Response>(response, headers, cancellationToken).ConfigureAwait(continueOnCapturedContext: false);
                        if (objectResponse.Object == null)
                        {
                            throw new ApiException("Response was null which was not expected.", status, objectResponse.Text, headers, innerException: null);
                        }
                        throw new ApiException<Response>("Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n", status, objectResponse.Text, headers, objectResponse.Object, innerException: null);
                    }
                    else
                    if (status == 403)
                    {
                        var objectResponse = await ReadObjectResponseAsync<Response2>(response, headers, cancellationToken).ConfigureAwait(continueOnCapturedContext: false);
                        if (objectResponse.Object == null)
                        {
                            throw new ApiException("Response was null which was not expected.", status, objectResponse.Text, headers, innerException: null);
                        }
                        throw new ApiException<Response2>("Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won\'t help here.\n", status, objectResponse.Text, headers, objectResponse.Object, innerException: null);
                    }
                    else
                    if (status == 429)
                    {
                        var objectResponse = await ReadObjectResponseAsync<Response3>(response, headers, cancellationToken).ConfigureAwait(continueOnCapturedContext: false);
                        if (objectResponse.Object == null)
                        {
                            throw new ApiException("Response was null which was not expected.", status, objectResponse.Text, headers, innerException: null);
                        }
                        throw new ApiException<Response3>("The app has exceeded its rate limits.\n", status, objectResponse.Text, headers, objectResponse.Object, innerException: null);
                    }
                    else
                    {
                        var responseData = response.Content == null ? null : await response.Content.ReadAsStringAsync().ConfigureAwait(continueOnCapturedContext: false);
                        throw new ApiException("The HTTP status code of the response was not expected (" + status + ").", status, responseData, headers, innerException: null);
                    }
                }
                finally
                {
                    if (disposeResponse)
                        response.Dispose();
                }
            }
            finally
            {
                if (disposeClient)
                    client.Dispose();
            }
        }
    }
}
