using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

[Route("Me/Following")]
public class MeFollowingController : ApiControllerBase
{
    [HttpGet("creators/contains")]
    [SwaggerOperation(Summary = "Check if current user follows a creator")]
    [SwaggerResponse(statusCode: 200, "", typeof(bool))]
    [CallsSpotifyApi(SpotifyScopes.UserFollowRead)]
    public async Task<ActionResult<bool>> CheckIfCurrentUserFollowsCreator(CreatorType type,
        [SwaggerParameter("Artist or user id.")]
        string creatorId,
        [FromServices] ISpotifyService spotifyService)
    {
        var response = await spotifyService.IsCurrentUserFollowingCreator(type, creatorId);

        return Ok(response);
    }

    [HttpPut("creators/{id}")]
    [SwaggerOperation(Summary = "Make current user follow a creator")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> FollowCreator(
        [SwaggerParameter("Artist or user id.")]
        string id,
        CreatorType type,
        [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.FollowCreator(type, id);

        return NoContent();
    }

    [HttpDelete("creators/{id}")]
    [SwaggerOperation(Summary = "Make current user unfollow a creator")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> UnfollowCreator(
        [SwaggerParameter("Artist or user id.")]
        string id,
        CreatorType type,
        [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.UnfollowCreator(type, id);

        return NoContent();
    }

    [HttpGet("albums/contains")]
    [SwaggerOperation(Summary = "Check if current user follows an album")]
    [SwaggerResponse(statusCode: 200, "", typeof(bool))]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryRead)]
    public async Task<ActionResult<bool>> CheckIfCurrentUserFollowsAnAlbum(string albumId,
        [FromServices] ISpotifyService spotifyService)
    {
        var response = await spotifyService.IsCurrentUserFollowingAnAlbum(albumId);

        return Ok(response);
    }

    [HttpPut("albums/{id}")]
    [SwaggerOperation(Summary = "Save an album to your library")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> FollowAlbum(string id, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.FollowAlbum(id);

        return NoContent();
    }

    [HttpDelete("albums/{id}")]
    [SwaggerOperation(Summary = "Remove an album from your library")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserFollowModify)]
    public async Task<ActionResult> UnfollowAlbum(string id, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.UnfollowAlbum(id);

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
    public async Task<ActionResult> FollowTracks(List<string> ids, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.FollowTracks(ids);

        return NoContent();
    }

    [HttpDelete("tracks")]
    [SwaggerOperation(Summary = "Remove tracks from your 'Liked Songs' collection")]
    [SwaggerResponse(statusCode: 204)]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryModify)]
    public async Task<ActionResult> UnfollowTracks(List<string> ids, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.UnfollowTracks(ids);

        return NoContent();
    }
}
