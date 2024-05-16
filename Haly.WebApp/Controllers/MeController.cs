using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.Artists;
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
            // This is the only endpoint in our API that returns a 'User', so it's not possible to provide
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
    public async Task<ActionResult<PlaylistBriefDto>> CreatePlaylist(string name, ICurrentUserStore meStore)
    {
        var user = meStore.User!;
        var response = await Mediator.Send(new CreatePlaylistCommand(user.Id, name));

        return CreatedAtRoute(routeName: "GetPlaylist", new { id = response.Id }, response);
    }

    [HttpPut("playlists")]
    [SwaggerOperation(Summary = "Fetch current user's playlists from Spotify and update our cache if they're changed")]
    [SwaggerResponse(statusCode: 200, "User playlists updated", typeof(IEnumerable<PlaylistBriefDto>))]
    [SwaggerResponse(statusCode: 404, "User not found", typeof(Problem))]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate, SpotifyScopes.PlaylistReadCollaborative)]
    public async Task<ActionResult<IEnumerable<PlaylistBriefDto>>> PutMyPlaylists(ICurrentUserStore meStore)
    {
        var currentUser = meStore.User!;
        var response = await Mediator.Send(new UpdateMyPlaylistsCommand(currentUser.Id));

        if (response is null) return ProblemResponses.NotFound("User not found");

        return Ok(response);
    }

    [HttpGet("tracks")]
    [SwaggerOperation(Summary = "Get current user's 'Liked Songs' collection from our cache")]
    [SwaggerResponse(statusCode: 200, "'Liked Songs' collection", typeof(GetMyLikedSongsQueryResponse))]
    public async Task<GetMyLikedSongsQueryResponse> GetMyLikedSongs(ICurrentUserStore meStore)
    {
        var response = await Mediator.Send(new GetMyLikedSongsQuery(meStore.User!));

        return response;
    }

    [HttpPut("tracks")]
    [SwaggerOperation(Summary =
        "Fetch current user's 'Liked Songs' collection from Spotify and update our cache if it's changed")]
    [SwaggerResponse(statusCode: 204, "'Liked Songs' collection updated")]
    [CallsSpotifyApi(SpotifyScopes.UserLibraryRead)]
    public async Task<ActionResult<PlaylistBriefDto>> PutMyLikedSongs(ICurrentUserStore meStore)
    {
        await Mediator.Send(new UpdateMyLikedSongsCommand(meStore.User!));

        return NoContent();
    }

    [HttpGet("artists")]
    [SwaggerOperation(Summary = "Get current user's followed artists from Spotify")]
    [SwaggerResponse(statusCode: 200, "A list of artists", typeof(IEnumerable<FollowedArtistDto>))]
    [CallsSpotifyApi(SpotifyScopes.UserFollowRead)]
    public async Task<IEnumerable<FollowedArtistDto>> GetMyFollowedArtists()
    {
        var response = await Mediator.Send(new GetMyFollowedArtistsQuery());

        return response;
    }

    [HttpGet("feed")]
    [SwaggerOperation(Summary = "Get current user's feed")]
    [SwaggerResponse(statusCode: 200, "Current user's feed", typeof(UserFeedDto))]
    [CallsSpotifyApi(SpotifyScopes.UserTopRead, SpotifyScopes.UserReadRecentlyPlayed)]
    public async Task<UserFeedDto> GetMyFeed(ICurrentUserStore meStore)
    {
        var user = meStore.User!;
        var response = await Mediator.Send(new GetMyFeedQuery(user.Market));

        return response;
    }

    [HttpGet("feed/artists")]
    [SwaggerOperation(Summary = "Get current user's top artists from Spotify")]
    [SwaggerResponse(statusCode: 200, "A list of top artists", typeof(IEnumerable<ArtistCardDto>))]
    [CallsSpotifyApi(SpotifyScopes.UserTopRead)]
    public async Task<IEnumerable<ArtistCardDto>> GetMyTopArtists()
    {
        var response = await Mediator.Send(new GetMyTopArtistsQuery());

        return response;
    }
}
