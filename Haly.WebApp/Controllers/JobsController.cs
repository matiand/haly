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
    [SwaggerOperation(Summary = "Refetch current user's playlist tracks")]
    [SwaggerResponse(statusCode: 204, "Playlist tracks refetched")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    public async Task<ActionResult> RefetchCurrentUserPlaylistTracks([FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        await Mediator.Send(new RefetchPlaylistTracksCommand(currentUser.Id));

        return NoContent();
    }

    [HttpGet("new-releases/completed/latest")]
    [SwaggerOperation(Summary = "Get latest completed 'Collect new releases' job")]
    [SwaggerResponse(statusCode: 200, "A job", typeof(NewReleasesJobDto))]
    public async Task<ActionResult<NewReleasesJobDto>> GetLatestCompletedNewReleasesJob(
        [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        var job = await Mediator.Send(new GetLatestNewReleasesJobQuery(currentUser.Id));

        if (job is null) return ProblemResponses.NotFound("No completed 'Collect new releases' job found");

        return job;
    }


    [HttpPost("new-releases")]
    [SwaggerOperation(Summary = "Collect new releases from current user's followed artists")]
    [SwaggerResponse(statusCode: 204, "New releases collected")]
    [CallsSpotifyApi()]
    public async Task<NoContentResult> CollectNewReleases([FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        await Mediator.Send(new CollectNewReleasesCommand(currentUser.Id, currentUser.Market));

        return NoContent();
    }
}
