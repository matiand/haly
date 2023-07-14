using Haly.GeneratedClients;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public interface ISpotifyEndpointCollector
{
    /// <summary>
    /// Gets data from a paginated endpoint using multiple concurrent requests.
    /// </summary>
    /// <typeparam name="TPaging">Type of the paging object returned by the endpointFn.</typeparam>
    /// <typeparam name="TItem">Type of the items to be collected.</typeparam>
    /// <param name="endpointFn">
    /// A lambda representing the endpoint that provides the data to be collected.
    /// The lambda takes two parameters: limit and offset.
    /// </param>
    /// <param name="dataFn">
    /// A lambda expression that extracts the relevant items from the paging object returned by the endpoint.
    /// Takes a single parameter of type <typeparamref name="TPaging"/>.
    /// </param>
    /// <param name="endpointLimit">The number of items that will be retrieved from the endpoint in a single request.</param>
    /// <param name="maxConcurrentRequests">The maximum number of concurrent requests that will be made to the endpoint.</param>
    /// <param name="startingOffset">The starting offset for the data collection. Default is 0</param>
    Task<List<TItem>> FetchConcurrently<TPaging, TItem>(
        Func<int, int, Task<TPaging>> endpointFn,
        Func<TPaging, IEnumerable<TItem>> dataFn,
        int endpointLimit, int maxConcurrentRequests, int startingOffset = 0) where TPaging : PagingObject;
}
