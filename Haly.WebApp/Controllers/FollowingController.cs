using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("Me/[controller]")]
public class FollowingController : ApiControllerBase
{
    [HttpGet("creators/contains")]
    [SwaggerOperation(Summary = "Check if current user follows a creator")]
    [SwaggerResponse(statusCode: 200, "", typeof(bool))]
    [CallsSpotifyApi(SpotifyScopes.UserFollowRead)]
    public async Task<ActionResult<bool>> CheckIfCurrentUserFollowsCreator(CreatorType type, string creatorId,
        [FromServices] ISpotifyService spotifyService)
    {
        var response = await spotifyService.IsCurrentUserFollowing(type, creatorId);

        return Ok(response);
    }

    [HttpPut("creators/{id}")]
    [SwaggerOperation(Summary = "Follow a creator")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> FollowCreator(string id, CreatorType type,
        [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.FollowCreator(type, id);

        return NoContent();
    }

    [HttpDelete("creators/{id}")]
    [SwaggerOperation(Summary = "Unfollow a creator")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> UnfollowCreator(string id, CreatorType type,
        [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.UnfollowCreator(type, id);

        return NoContent();
    }


    [HttpPut("playlists/{id}")]
    [SwaggerOperation(Summary = "Save a playlist to your library")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.PlaylistModifyPublic, SpotifyScopes.PlaylistModifyPrivate)]
    public async Task<ActionResult> FollowPlaylist(string id, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.FollowPlaylist(id);

        return NoContent();
    }

    [HttpDelete("playlists/{id}")]
    [SwaggerOperation(Summary = "Remove a playlist from your library")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.PlaylistModifyPublic, SpotifyScopes.PlaylistModifyPrivate)]
    public async Task<ActionResult> UnfollowPlaylist(string id, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.UnfollowPlaylist(id);

        return NoContent();
    }

    [HttpPut("tracks")]
    [SwaggerOperation(Summary = "Save tracks to your 'Liked Songs' collection")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryModify)]
    public async Task<ActionResult> FollowTracks(string ids, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.FollowTracks(ids);

        return NoContent();
    }

    [HttpDelete("tracks")]
    [SwaggerOperation(Summary = "Remove tracks from your 'Liked Songs' collection")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryModify)]
    public async Task<ActionResult> UnfollowTracks(string ids, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.UnfollowTracks(ids);

        return NoContent();
    }
}
