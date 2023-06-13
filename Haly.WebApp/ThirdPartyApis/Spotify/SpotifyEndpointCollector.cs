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
    /// <param name="endpointLimit">The maximum number of items that can be retrieved from the endpoint in a single request.</param>
    /// <param name="maxConcurrentRequests">The maximum number of concurrent requests that can be made to the endpoint.</param>
    /// <param name="startingOffset">The starting offset for the data collection. Default is 0</param>
    Task<List<TItem>> FetchConcurrently<TPaging, TItem>(
        Func<int, int, Task<TPaging>> endpointFn,
        Func<TPaging, IEnumerable<TItem>> dataFn,
        int endpointLimit, int maxConcurrentRequests, int startingOffset = 0) where TPaging : PagingObject;
}

public class SpotifyEndpointCollector : ISpotifyEndpointCollector
{
    public async Task<List<TItem>> FetchConcurrently<TPaging, TItem>(
        Func<int, int, Task<TPaging>> endpointFn,
        Func<TPaging, IEnumerable<TItem>> dataFn,
        int endpointLimit, int maxConcurrentRequests, int startingOffset = 0) where TPaging : PagingObject
    {
        // We start with a single request to retrieve endpoint's remaining items
        var firstRequest = await endpointFn(endpointLimit, startingOffset);
        var total = firstRequest.Total;

        var data = new List<TItem>(dataFn(firstRequest));
        var remaining = total - firstRequest.Offset - firstRequest.Limit;

        while (remaining > 0)
        {
            var nextRequestCount = CalculateBatchSize(remaining, endpointLimit, maxConcurrentRequests);
            var nextOffset = total - remaining;

            var requests = Enumerable.Range(start: 0, count: nextRequestCount)
                .Select((_, idx) => endpointFn(endpointLimit, nextOffset + (idx * endpointLimit)));

            data.AddRange((await Task.WhenAll(requests)).SelectMany(dataFn));

            remaining -= nextRequestCount * endpointLimit;
        }

        return data.ToList();
    }

    private int CalculateBatchSize(int remaining, int endpointLimit, int maxConcurrentRequests)
    {
        var ceil = Math.Ceiling((double)remaining / endpointLimit);
        return Math.Min((int)ceil, maxConcurrentRequests);
    }
}
