using Haly.WebApp.Features.Search.FindTrackQuery;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class SearchController : ApiControllerBase
{
    [HttpGet("playback")]
    [SwaggerOperation(Summary = "Find track in the cache",
        Description = "Find a track in the cache using playback data")]
    [SwaggerResponse(statusCode: 200, "Track search result", typeof(TrackSearchResultDto))]
    public async Task<IActionResult> SearchCacheUsingPlaybackData(string playlistId, string trackPlaybackId)
    {
        var request = new FindTrackQuery(playlistId, trackPlaybackId);
        var response = await Mediator.Send(request);

        return Ok(response);
    }
}
