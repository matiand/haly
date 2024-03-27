using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Playlists.AddTracks;
using Haly.WebApp.Features.Playlists.GetPlaylist;
using Haly.WebApp.Features.Playlists.GetTracks;
using Haly.WebApp.Features.Playlists.RemoveTracks;
using Haly.WebApp.Features.Playlists.UpdatePlaylist;
using Haly.WebApp.Features.Playlists.UpdatePlaylistDetails;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

public class PlaylistsController : ApiControllerBase
{
    [HttpGet("{id}", Name = nameof(GetPlaylist))]
    [SwaggerOperation(Summary = "Get playlist", Description = "Get playlist from our cache")]
    [SwaggerResponse(statusCode: 200, "Playlist found", typeof(PlaylistWithTracksDto))]
    [SwaggerResponse(statusCode: 400, "Bad request", typeof(Problem))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(Problem))]
    public async Task<ActionResult<PlaylistWithTracksDto>> GetPlaylist(string id,
        [SwaggerParameter(Description =
            "Track sorting order. Allowed values: title, title_desc, artist, artist_desc, album, album_desc, added_at, added_at_desc, duration, duration_desc.")]
        string? sortOrder)
    {
        var response = await Mediator.Send(new GetPlaylistQuery(id, sortOrder));
        if (response is null) return ProblemResponses.NotFound("Playlist not found");

        return response;
    }

    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update playlist",
        Description = "Fetch playlist from Spotify and update our cache if it's changed")]
    [SwaggerResponse(statusCode: 201, "Playlist created")]
    [SwaggerResponse(statusCode: 204, "Playlist updated")]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(Problem))]
    [CallsSpotifyApi()]
    public async Task<ActionResult> PutPlaylist(string id, CurrentUserStore currentUserStore, bool forceUpdate = false)
    {
        var response = await Mediator.Send(new UpdatePlaylistCommand(id, currentUserStore.User!.Market, forceUpdate));

        if (response is null) return ProblemResponses.NotFound("Playlist not found");

        if (response.Created)
        {
            return CreatedAtAction(nameof(GetPlaylist), new { id = response.PlaylistId }, value: null);
        }

        return NoContent();
    }

    [HttpGet("{playlistId}/tracks")]
    [SwaggerOperation(Summary = "Get playlist's tracks", Description = "Get playlist's tracks from our cache")]
    [SwaggerResponse(statusCode: 200, "Returns tracks", typeof(PaginatedTracksDto))]
    [SwaggerResponse(statusCode: 400, "Bad request", typeof(ValidationProblem))]
    [SwaggerResponse(statusCode: 404, "Playlist not found", typeof(Problem))]
    public async Task<ActionResult<PaginatedTracksDto>> GetTracks(string playlistId,
        [SwaggerParameter("Between 1 and 200 (inclusive).")]
        int limit,
        int offset,
        [SwaggerParameter(
            "Track sorting order. Allowed values: title, title_desc, artist, artist_desc, album, album_desc, added_at, added_at_desc, duration, duration_desc.")]
        string? sortOrder,
        [SwaggerParameter("Used for filtering tracks. Matches their name, album or artists.")]
        string? searchTerm)
    {
        var response =
            await Mediator.Send(new GetPlaylistTracksQuery(playlistId, limit, offset, sortOrder, searchTerm));
        if (response is null) return ProblemResponses.NotFound("Playlist not found");

        return Ok(response);
    }

    [HttpPost("{playlistId}/tracks")]
    [SwaggerOperation(Summary = "Add tracks to a playlist")]
    [SwaggerResponse(statusCode: 200, "Tracks added", typeof(PlaylistBriefDto))]
    [SwaggerResponse(statusCode: 404, "Playlist or tracks were not found", typeof(Problem))]
    [SwaggerResponse(statusCode: 409, "Duplicate tracks were found", typeof(DuplicateProblem))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistModifyPublic, SpotifyScopes.PlaylistModifyPrivate)]
    public async Task<ActionResult<PlaylistBriefDto>> AddTracks(
        [SwaggerParameter("The id of the playlist to add tracks to.")]
        string playlistId,
        AddTracksRequestBody body,
        [FromServices] CurrentUserStore currentUserStore)
    {
        var command = new AddTracksCommand()
        {
            PlaylistId = playlistId,
            UserMarket = currentUserStore.User!.Market,
            Body = body,
        };
        var response = await Mediator.Send(command);

        if (response.Playlist is null) return ProblemResponses.NotFound("Playlist or tracks were not found.");

        if (response.DuplicateType is not DuplicateType.None)
            return ProblemResponses.DuplicateConflict(response.Playlist, response.DuplicateType);

        return Ok(response.Playlist);
    }

    [HttpDelete("{playlistId}/tracks")]
    [SwaggerOperation(Summary = "Remove tracks from a playlist")]
    [SwaggerResponse(statusCode: 200, "Tracks removed", typeof(PlaylistBriefDto))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistModifyPublic, SpotifyScopes.PlaylistModifyPrivate)]
    public async Task<PlaylistBriefDto> RemoveTracks(string playlistId,
        [SwaggerRequestBody($"Array of **{nameof(RemoveTrackDto)}** objects.")]
        RemoveTracksRequestBody body)
    {
        var response = await Mediator.Send(new RemoveTracksCommand(playlistId, body));

        return response;
    }

    [HttpPut("{playlistId}/details")]
    [SwaggerOperation(Summary = "Update playlist details")]
    [SwaggerResponse(statusCode: 204, "Playlist details updated")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistModifyPublic, SpotifyScopes.PlaylistModifyPrivate)]
    public async Task<ActionResult> UpdatePlaylistDetails(string playlistId, UpdatePlaylistDetailsRequestBody body)
    {
        var command = new UpdatePlaylistDetailsCommand(playlistId, body);
        await Mediator.Send(command);

        return NoContent();
    }
}
