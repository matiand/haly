using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Users.GetUser;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class UsersController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get user", Description = "Fetch user from Spotify")]
    [SwaggerResponse(statusCode: 200, "A user", typeof(PublicUserDto))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    [CallsSpotifyApi()]
    public async Task<ActionResult<PublicUserDto>> GetUser(string id)
    {
        var response = await Mediator.Send(new GetUserQuery(id));
        if (response is null) return NotFound();

        return Ok(response);
    }
}
