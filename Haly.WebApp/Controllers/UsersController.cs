using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.User;
using Haly.WebApp.Features.User.GetLikedSongs;
using Haly.WebApp.Features.User.GetUser;
using Haly.WebApp.Features.User.UpdateCurrentUser;
using Haly.WebApp.Features.User.UpdateUserPlaylists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("[controller]/{userId}")]
public class UsersController : ApiControllerBase
{
    [HttpGet("", Name = "GetUser")]
    [SwaggerOperation(Summary = "Get user by id", Description = "Get user from our cache")]
    [SwaggerResponse(statusCode: 200, "User found", typeof(UserDto))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    public async Task<ActionResult<UserDto>> GetUser(string userId)
    {
        var response = await Mediator.Send(new GetUserQuery(userId));
        if (response is null) return NotFound();

        return response;
    }

    [HttpPut("/[controller]/me")]
    [CallsSpotifyApi(SpotifyScopes.UserReadPrivate)]
    [SwaggerOperation(
        Summary = "Update current user",
        Description =
            "Fetches current user from Spotify API, updates our cache with that data, creates new User if he's missing")]
    [SwaggerResponse(statusCode: 200, "User updated", typeof(UserDto))]
    [SwaggerResponse(statusCode: 201, "User created", typeof(UserDto))]
    public async Task<ActionResult<UserDto>> PutCurrentUser()
    {
        var response = await Mediator.Send(new UpdateCurrentUserCommand());
        if (response.Created)
        {
            return CreatedAtRoute("GetUser", new { userId = response.User.Id }, response.User);
        }

        return response.User;
    }

    [HttpPut("playlists")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    [SwaggerOperation(
        Summary = "Update user playlists",
        Description = "Fetches user playlists from Spotify API, updates our cache with that data.")]
    [SwaggerResponse(statusCode: 200, "User playlists updated", typeof(IEnumerable<UserPlaylistDto>))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    public async Task<ActionResult<IEnumerable<UserPlaylistDto>>> PutUserPlaylists(string userId)
    {
        var response = await Mediator.Send(new UpdateUserPlaylistsCommand(userId));
        if (response is null) return NotFound();

        return Ok(response);
    }

    [HttpGet]
    [Route("tracks")]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryRead)]
    [SwaggerOperation(Summary = "Get current user 'Liked Songs' collection")]
    [SwaggerResponse(statusCode: 200, "'Liked Songs' returned", typeof(IEnumerable<TrackDto>))]
    public async Task<IEnumerable<TrackDto>> GetLikedSongs([FromQuery] string market)
    {
        return await Mediator.Send(new GetLikedSongsQuery(market));
    }
}
