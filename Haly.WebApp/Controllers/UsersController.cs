using Haly.WebApp.Features.User;
using Haly.WebApp.Features.User.GetUser;
using Haly.WebApp.Features.User.UpdateUserPlaylists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("users/{id}")]
public class UsersController : ApiControllerBase
{
    [HttpGet("", Name = "GetUser")]
    [SwaggerOperation(Summary = "Get user by id", Description = "Get user from our cache")]
    [SwaggerResponse(statusCode: 200, "User found", typeof(UserDto))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(ProblemDetails))]
    public async Task<ActionResult<UserDto>> GetUser(string id)
    {
        var response = await Mediator.Send(new GetUserQuery(id));
        if (response is null) return NotFound();

        return response;
    }

    [HttpPut("playlists")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    [SwaggerOperation(
        Summary = "Update user playlists",
        Description = "Fetches user playlists from Spotify API, updates our cache with that data.")]
    [SwaggerResponse(statusCode: 200, "User playlists updated", typeof(IEnumerable<UserPlaylistDto>))]
    public async Task<ActionResult<IEnumerable<UserPlaylistDto>>> PutUserPlaylists(string market)
    {
        var response = await Mediator.Send(new UpdateUserPlaylistsCommand(market));

        return Ok(response);
    }
}
