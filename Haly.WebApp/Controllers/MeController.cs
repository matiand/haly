using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.CurrentUser.GetLikedSongs;
using Haly.WebApp.Features.CurrentUser.UpdateCurrentUser;
using Haly.WebApp.Features.CurrentUser.UpdateUserPlaylists;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Swagger;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("[controller]")]
public class MeController : ApiControllerBase
{
    [HttpPut("")]
    [SwaggerResponse(statusCode: 200, "User updated", typeof(UserDto))]
    [SwaggerResponse(statusCode: 201, "User created", typeof(UserDto))]
    [ServiceFilter(typeof(UpdateCurrentUserStoreFilterService), Order = int.MinValue)]
    [SwaggerOperationFilter(typeof(GettingStartedFilter))]
    [CallsSpotifyApi(SpotifyScopes.UserReadPrivate)]
    public async Task<ActionResult<UserDto>> PutCurrentUser(string spotifyToken)
    {
        var response = await Mediator.Send(new UpdateCurrentUserCommand(spotifyToken));
        if (response.Created)
        {
            return CreatedAtRoute("GetUser", new { userId = response.User.Id }, response.User);
        }

        return response.User;
    }

    [HttpPut("playlists")]
    [SwaggerOperation(Summary = "Update current user's playlists")]
    [SwaggerResponse(statusCode: 200, "User playlists updated", typeof(IEnumerable<UserPlaylistDto>))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    public async Task<ActionResult<IEnumerable<UserPlaylistDto>>> PutCurrentUserPlaylists(
        [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUserId = currentUserStore.UserId!;
        var response = await Mediator.Send(new UpdateCurrentUserPlaylistsCommand(currentUserId));
        if (response is null) return NotFound();

        return Ok(response);
    }

    [HttpGet]
    [Route("tracks")]
    [SwaggerOperation(Summary = "Get current user 'Liked Songs' collection")]
    [SwaggerResponse(statusCode: 200, "'Liked Songs' returned", typeof(IEnumerable<TrackDto>))]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryRead)]
    public async Task<IEnumerable<TrackDto>> GetLikedSongs([FromServices] CurrentUserStore currentUserStore)
    {
        var currentUserMarket = currentUserStore.Market!;
        return await Mediator.Send(new GetLikedSongsQuery(currentUserMarket));
    }
}