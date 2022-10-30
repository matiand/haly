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
    [SwaggerOperation(Summary = "Get playlist by id", Description = "Get playlist from our cache")]
    [SwaggerResponse(statusCode: 200, "Playlist found", typeof(PlaylistDto))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(ProblemDetails))]
    public async Task<ActionResult<PlaylistDto>> GetPlaylist(string id)
    {
        var response = await Mediator.Send(new GetPlaylistQuery(id));
        if (response is null) return NotFound();

        return response;
    }

    [HttpGet("{playlistId}/tracks")]
    [SwaggerOperation(Summary = "Get playlist's tracks by id", Description = "Get playlist's tracks from our cache")]
    [SwaggerResponse(statusCode: 200, "Returns tracks", typeof(IEnumerable<TrackDto>))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(ProblemDetails))]
    public async Task<ActionResult<IEnumerable<TrackDto>>> GetTracks(string playlistId)
    {
        var response = await Mediator.Send(new GetPlaylistTracksQuery(playlistId));
        if (response is null) return NotFound();

        return Ok(response);
    }
}
