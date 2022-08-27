using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.User;
using Haly.WebApp.Features.User.GetLikedSongs;
using Haly.WebApp.Features.User.UpdateCurrentUser;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("users/me")]
public class CurrentUserController : ApiControllerBase
{
    [HttpPut]
    [CallsSpotifyApi(SpotifyScopes.UserReadPrivate)]
    [SwaggerOperation(
        Summary = "Update current user",
        Description =
            "Fetches current user from Spotify API, updates our cache with that data, creates new User if he's missing")]
    [SwaggerResponse(statusCode: 200, "User updated", typeof(UserDto))]
    [SwaggerResponse(statusCode: 201, "User created", typeof(UserDto))]
    public async Task<ActionResult<UserDto>> Put()
    {
        var response = await Mediator.Send(new UpdateCurrentUserCommand());
        if (response.Created)
        {
            return CreatedAtRoute("GetUser", new { id = response.User.Id }, response.User);
        }

        return response.User;
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
