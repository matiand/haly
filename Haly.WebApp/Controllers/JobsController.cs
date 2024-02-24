using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class JobsController : ApiControllerBase
{
    [HttpPost("playlist-tracks")]
    [SwaggerOperation(Summary = "Refetch current user's playlist tracks")]
    [SwaggerResponse(statusCode: 204, "Playlist tracks refetched")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    public async Task<ActionResult> RefetchCurrentUserPlaylistTracks([FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        await Mediator.Send(new RefetchPlaylistTracksCommand(currentUser.Id));

        return NoContent();
    }
}
