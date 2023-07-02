using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.CurrentUser.UpdateCurrentUser;
using Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;
using Haly.WebApp.Features.CurrentUser.UpdatePlaylists;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Swagger;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class MeController : ApiControllerBase
{
    [HttpPut("", Name = nameof(PutCurrentUser))]
    [SwaggerOperation(Summary = "Fetch current user from Spotify and update our cache if it's changed")]
    [SwaggerResponse(statusCode: 200, "User updated", typeof(UserDto))]
    [SwaggerResponse(statusCode: 201, "User created", typeof(UserDto))]
    [SwaggerOperationFilter(typeof(GettingStartedFilter))]
    [CallsSpotifyApi(SpotifyScopes.UserReadPrivate)]
    public async Task<ActionResult<UserDto>> PutCurrentUser([FromBody] string spotifyToken)
    {
        var user = await Mediator.Send(new UpdateAccessTokenCommand(spotifyToken));

        var response = await Mediator.Send(new UpdateCurrentUserCommand(user));
        if (response.Created)
        {
            // This is the only endpoint that returns a 'User', so it's not even possible to provide
            // a valid 'Location' header with CreatedAtAction method. That's why we return a
            // bare 201 response with the 'User' in its body.
            return StatusCode(StatusCodes.Status201Created, response.User);
        }

        return response.User;
    }

    [HttpPut("playlists")]
    [SwaggerOperation(Summary = "Fetch current user's playlists from Spotify and update our cache if they're changed")]
    [SwaggerResponse(statusCode: 200, "User playlists updated", typeof(IEnumerable<PlaylistBriefDto>))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    public async Task<ActionResult<IEnumerable<PlaylistBriefDto>>> PutCurrentUserPlaylists(
        [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUserId = currentUserStore.User!.Id;
        var response = await Mediator.Send(new UpdateCurrentUserPlaylistsCommand(currentUserId));
        if (response is null) return NotFound();

        return Ok(response);
    }

    [HttpPut("tracks")]
    [SwaggerOperation(Summary = "Fetch current user's 'Liked Songs' collection from Spotify and update our cache if it's changed")]
    [SwaggerResponse(statusCode: 200, "'Liked Songs' updated", typeof(PlaylistBriefDto))]
    [SwaggerResponse(statusCode: 201, "'Liked Songs' created", typeof(PlaylistBriefDto))]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryRead)]
    public async Task<ActionResult<PlaylistBriefDto>> PutCurrentUserLikedSongs(
        [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        var response = await Mediator.Send(new UpdateCurrentUserLikedSongsCommand(currentUser.Id, currentUser.Market));

        return response.Created
            ? CreatedAtAction("GetPlaylist", "Playlists", new { response.Playlist.Id }, response.Playlist)
            : Ok(response.Playlist);
    }
}
