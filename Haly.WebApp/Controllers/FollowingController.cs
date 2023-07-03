using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("me/[controller]")]
public class FollowingController : ApiControllerBase
{
    [HttpGet("contains")]
    [SwaggerOperation(Summary = "Check if current user follows a creator")]
    [SwaggerResponse(statusCode: 200, "", typeof(bool))]
    [CallsSpotifyApi(SpotifyScopes.UserFollowRead)]
    public async Task<ActionResult<bool>> CheckIfCurrentUserFollows(CreatorType type, string creatorId,
        [FromServices] ISpotifyService spotifyService)
    {
        var response = await spotifyService.IsCurrentUserFollowing(type, creatorId);

        return Ok(response);
    }

    [HttpPut]
    [SwaggerOperation(Summary = "Follow a creator")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> Follow(CreatorType type, string creatorId,
        [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.Follow(type, creatorId);

        return NoContent();
    }

    [HttpDelete]
    [SwaggerOperation(Summary = "Unfollow a creator")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> Unfollow(CreatorType type, string creatorId,
        [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.Unfollow(type, creatorId);

        return NoContent();
    }
}
