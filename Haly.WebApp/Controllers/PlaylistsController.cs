using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Playlists.GetPlaylist;
using Haly.WebApp.Features.Playlists.GetTracks;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("[controller]")]
public class PlaylistsController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get playlist", Description = "Get playlist from our cache")]
    [SwaggerResponse(statusCode: 200, "Playlist found", typeof(GetPlaylistResponse))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(ProblemDetails))]
    public async Task<ActionResult<GetPlaylistResponse>> GetPlaylist(string id)
    {
        var response = await Mediator.Send(new GetPlaylistQuery(id));
        if (response is null) return NotFound();

        return response;
    }

    [HttpGet("{playlistId}/tracks")]
    [SwaggerOperation(Summary = "Get playlist's tracks", Description = "Get playlist's tracks from our cache")]
    [SwaggerResponse(statusCode: 200, "Returns tracks", typeof(PaginatedList<TrackDto>))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(ProblemDetails))]
    public async Task<ActionResult<PaginatedList<TrackDto>>> GetTracks(string playlistId, int limit = 100, int offset = 0)
    {
        var response = await Mediator.Send(new GetPlaylistTracksQuery(playlistId, limit, offset));
        if (response is null) return NotFound();

        return Ok(response);
    }
}
