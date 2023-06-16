using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Playlists.GetPlaylist;
using Haly.WebApp.Features.Playlists.GetTracks;
using Haly.WebApp.Features.Playlists.UpdatePlaylist;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class PlaylistsController : ApiControllerBase
{
    [HttpGet("{id}", Name = nameof(GetPlaylist))]
    [SwaggerOperation(Summary = "Get playlist", Description = "Get playlist from our cache")]
    [SwaggerResponse(statusCode: 200, "Playlist found", typeof(PlaylistWithTracksDto))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(Problem))]
    public async Task<ActionResult<PlaylistWithTracksDto>> GetPlaylist(string id)
    {
        var response = await Mediator.Send(new GetPlaylistQuery(id));
        if (response is null) return NotFound();

        return response;
    }

    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update playlist", Description = "Fetch playlist from Spotify and update it if it's changed")]
    [SwaggerResponse(statusCode: 200, "Playlist updated", typeof(PlaylistWithTracksDto))]
    [SwaggerResponse(statusCode: 201, "Playlist created", typeof(PlaylistWithTracksDto))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(Problem))]
    [CallsSpotifyApi()]
    public async Task<ActionResult<PlaylistWithTracksDto>> PutPlaylist(string id, [FromServices] CurrentUserStore currentUserStore)
    {
        var response = await Mediator.Send(new UpdatePlaylistCommand(id, currentUserStore.User!.Market));
        if (response is null) return NotFound();

        if (response.Created)
        {
            return CreatedAtAction(nameof(GetPlaylist), new { response.Playlist.Id }, response.Playlist);
        }

        return Ok(response.Playlist);
    }


    [HttpGet("{playlistId}/tracks")]
    [SwaggerOperation(Summary = "Get playlist's tracks", Description = "Get playlist's tracks from our cache")]
    [SwaggerResponse(statusCode: 200, "Returns tracks", typeof(PaginatedList<TrackDto>))]
    [SwaggerResponse(statusCode: 400, "Bad request", typeof(ValidationProblem))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(Problem))]
    public async Task<ActionResult<PaginatedList<TrackDto>>> GetTracks(string playlistId, int limit, int offset)
    {
        var response = await Mediator.Send(new GetPlaylistTracksQuery(playlistId, limit, offset));
        if (response is null) return NotFound();

        return Ok(response);
    }
}
