using Haly.GeneratedClients;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

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

    private static int CalculateBatchSize(int remaining, int endpointLimit, int maxConcurrentRequests)
    {
        var ceil = Math.Ceiling((double)remaining / endpointLimit);
        return Math.Min((int)ceil, maxConcurrentRequests);
    }
}
