using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.CurrentUser.GetFeed;
using Haly.WebApp.Features.CurrentUser.GetFollowedArtists;
using Haly.WebApp.Features.CurrentUser.GetLikedSongs;
using Haly.WebApp.Features.CurrentUser.GetTopArtists;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.CurrentUser.UpdateCurrentUser;
using Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;
using Haly.WebApp.Features.CurrentUser.UpdatePlaylists;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Playlists.CreatePlaylist;
using Haly.WebApp.Features.Swagger;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class MeController : ApiControllerBase
{
    [HttpPut("", Name = nameof(PutCurrentUser))]
    [SwaggerOperation(Summary = "Fetch current user from Spotify and update our cache if it's changed")]
    [SwaggerResponse(statusCode: 200, "User updated", typeof(PrivateUserDto))]
    [SwaggerResponse(statusCode: 201, "User created", typeof(PrivateUserDto))]
    [SwaggerOperationFilter(typeof(GettingStartedFilter))]
    [CallsSpotifyApi(SpotifyScopes.UserReadPrivate)]
    public async Task<ActionResult<PrivateUserDto>> PutCurrentUser([FromBody] string spotifyToken)
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

    [HttpPost("playlists")]
    [SwaggerOperation(Summary = "Create new playlist")]
    [SwaggerResponse(statusCode: 201, "", typeof(PlaylistBriefDto))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistModifyPublic)]
    public async Task<ActionResult<PlaylistBriefDto>> CreatePlaylist(string name,
        [FromServices] CurrentUserStore currentUserStore)
    {
        var userId = currentUserStore.User!.Id;
        var response = await Mediator.Send(new CreatePlaylistCommand(userId, name));

        return response;
    }

    [HttpPut("playlists")]
    [SwaggerOperation(Summary = "Fetch current user's playlists from Spotify and update our cache if they're changed")]
    [SwaggerResponse(statusCode: 200, "User playlists updated", typeof(IEnumerable<PlaylistBriefDto>))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate, SpotifyScopes.PlaylistReadCollaborative)]
    public async Task<ActionResult<IEnumerable<PlaylistBriefDto>>> PutMyPlaylists(
        [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUserId = currentUserStore.User!.Id;
        var response = await Mediator.Send(new UpdateMyPlaylistsCommand(currentUserId));
        if (response is null) return NotFound();

        return Ok(response);
    }

    [HttpGet("tracks")]
    [SwaggerOperation(Summary = "Fetch current user's 'Liked Songs' collection from our cache")]
    [SwaggerResponse(statusCode: 200, "'Liked Songs' collection", typeof(GetMyLikedSongsQueryResponse))]
    public async Task<GetMyLikedSongsQueryResponse> GetMyLikedSongs(
        [FromServices] CurrentUserStore currentUserStore)
    {
        var response = await Mediator.Send(new GetMyLikedSongsQuery(currentUserStore.User!));

        return response;
    }

    [HttpPut("tracks")]
    [SwaggerOperation(Summary =
        "Fetch current user's 'Liked Songs' collection from Spotify and update our cache if it's changed")]
    [SwaggerResponse(statusCode: 204, "'Liked Songs' collection updated")]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryRead)]
    public async Task<ActionResult<PlaylistBriefDto>> PutMyLikedSongs(
        [FromServices] CurrentUserStore currentUserStore)
    {
        await Mediator.Send(new UpdateMyLikedSongsCommand(currentUserStore.User!));

        return NoContent();
    }

    [HttpGet("artists")]
    [SwaggerOperation(Summary = "Fetch current user's followed artists from Spotify")]
    [SwaggerResponse(statusCode: 200, "A list of artists", typeof(IEnumerable<FollowedArtistDto>))]
    [CallsSpotifyApi(SpotifyScopes.UserFollowRead)]
    public async Task<IEnumerable<FollowedArtistDto>> GetMyFollowedArtists()
    {
        var response = await Mediator.Send(new GetMyFollowedArtistsQuery());

        return response;
    }

    [HttpGet("feed")]
    [SwaggerOperation(Summary = "Fetch current user's feed")]
    [CallsSpotifyApi(SpotifyScopes.UserTopRead, SpotifyScopes.UserReadRecentlyPlayed)]
    public async Task<UserFeedDto> GetMyFeed([FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;
        var response = await Mediator.Send(new GetMyFeedQuery(currentUser.Market));

        return response;
    }

    [HttpGet("feed/artists")]
    [SwaggerOperation(Summary = "Fetch current user's top artists from Spotify")]
    [SwaggerResponse(statusCode: 200, "A list of top artists", typeof(IEnumerable<TopArtistDto>))]
    [CallsSpotifyApi(SpotifyScopes.UserTopRead)]
    public async Task<IEnumerable<TopArtistDto>> GetMyTopArtists()
    {
        var response = await Mediator.Send(new GetMyTopArtistsQuery());

        return response;
    }
}
