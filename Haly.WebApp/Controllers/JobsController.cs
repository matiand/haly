using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Jobs.CollectNewReleases;
using Haly.WebApp.Features.Jobs.GetNewReleasesJob;
using Haly.WebApp.Features.Jobs.RefetchPlaylistTracks;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

public class JobsController : ApiControllerBase
{
    [HttpPost("playlist-tracks")]
    [SwaggerOperation(Summary = "Refetch current user's playlist tracks",
        Description = "Update tracks in playlists that have been marked as stale.")]
    [SwaggerResponse(statusCode: 204, "Playlist tracks refetched")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    public async Task<ActionResult> RefetchCurrentUserPlaylistTracks(CurrentUserStore meStore)
    {
        var user = meStore.User!;
        await Mediator.Send(new RefetchPlaylistTracksCommand(user.Id));

        return NoContent();
    }

    [HttpGet("new-releases/completed/latest")]
    [SwaggerOperation(Summary = "Get latest completed 'Collect new releases' job")]
    [SwaggerResponse(statusCode: 200, "A job", typeof(NewReleasesJobDto))]
    public async Task<ActionResult<NewReleasesJobDto>> GetLatestCompletedNewReleasesJob(CurrentUserStore meStore)
    {
        var user = meStore.User!;
        var job = await Mediator.Send(new GetLatestNewReleasesJobQuery(user.Id));

        if (job is null) return ProblemResponses.NotFound("No completed 'Collect new releases' job found");

        return job;
    }


    [HttpPost("new-releases")]
    [SwaggerOperation(Summary = "Collect new releases from current user's followed artists")]
    [SwaggerResponse(statusCode: 204, "New releases collected")]
    [CallsSpotifyApi()]
    public async Task<NoContentResult> CollectNewReleases(CurrentUserStore meStore)
    {
        var user = meStore.User!;
        await Mediator.Send(new CollectNewReleasesCommand(user.Id, user.Market));

        return NoContent();
    }
}
