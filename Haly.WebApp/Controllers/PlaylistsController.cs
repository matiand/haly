using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Playlists.GetPlaylist;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

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
}
