using Haly.WebApp.Features.Search.FindTrackQuery;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class SearchController : ApiControllerBase
{
    [HttpGet("playback")]
    [SwaggerOperation(Summary = "Find track in our cache",
        Description = "Find a track in our cache using playback data")]
    [SwaggerResponse(statusCode: 200, "Track search result", typeof(FindTrackQueryResponse))]
    public async Task<FindTrackQueryResponse> SearchCacheUsingPlaybackData(string playlistId, string trackPlaybackId)
    {
        var request = new FindTrackQuery(playlistId, trackPlaybackId);
        var response = await Mediator.Send(request);

        return response;
    }
}
