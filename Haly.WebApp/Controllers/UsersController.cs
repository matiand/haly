using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Users.GetUser;
using Haly.WebApp.Features.Users.GetUserPlaylists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

public class UsersController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get user", Description = "Fetch user from Spotify")]
    [SwaggerResponse(statusCode: 200, "A user", typeof(UserProfileDto))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    [CallsSpotifyApi()]
    public async Task<ActionResult<UserProfileDto>> GetUser(string id)
    {
        var response = await Mediator.Send(new GetUserQuery(id));
        if (response is null) return ProblemResponses.NotFound("User not found");

        return Ok(response);
    }

    [HttpGet("{userId}/playlists")]
    [SwaggerOperation(Summary = "Get user's playlists", Description = "Fetch a list of the playlists owned or followed by user from Spotify")]
    [SwaggerResponse(statusCode: 200, "List of playlists", typeof(IEnumerable<PlaylistCardDto>))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadCollaborative)]
    public async Task<ActionResult<IEnumerable<PlaylistCardDto>>> GetPlaylists(string userId)
    {
        var response = await Mediator.Send(new GetUserPlaylistsQuery(userId));

        return Ok(response);
    }
}
