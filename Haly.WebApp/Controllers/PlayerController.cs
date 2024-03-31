using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Player;
using Haly.WebApp.Features.Player.AddToQueue;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Features.Player.GetPlaybackState;
using Haly.WebApp.Features.Player.GetQueue;
using Haly.WebApp.Features.Player.GetRecentlyPlayed;
using Haly.WebApp.Features.Player.SetRepeatModeCommand;
using Haly.WebApp.Features.Player.UpdatePlayback;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

[Route("/Me/[controller]")]
public class PlayerController : ApiControllerBase
{
    [HttpGet("")]
    [SwaggerOperation(Summary = "Get current playback state")]
    [SwaggerResponse(statusCode: 200, "Current playback state", typeof(PlaybackStateDto))]
    [SwaggerResponse(statusCode: 204, "Playback is not active")]
    [CallsSpotifyApi(SpotifyScopes.UserReadPlaybackState)]
    public async Task<ActionResult<PlaybackStateDto>> GetPlaybackState()
    {
        var response = await Mediator.Send(new GetPlaybackStateQuery());
        if (response is null) return NoContent();

        return response;
    }

    [HttpPut("")]
    [SwaggerOperation(Summary = "Transfer playback to a new device")]
    [SwaggerResponse(statusCode: 204, "Playback transferred")]
    [CallsSpotifyApi(SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> TransferPlayback(string deviceId,
        ISpotifyPlaybackService playbackService)
    {
        await playbackService.TransferPlayback(deviceId);

        return NoContent();
    }

    [HttpGet("devices")]
    [SwaggerOperation(Summary = "Get available devices that current user can connect to")]
    [SwaggerResponse(statusCode: 200, "Devices found", typeof(IEnumerable<DeviceDto>))]
    [CallsSpotifyApi(SpotifyScopes.UserReadPlaybackState)]
    public async Task<IEnumerable<DeviceDto>> GetAvailableDevices()
    {
        var response = await Mediator.Send(new GetAvailableDevicesQuery());

        return response;
    }

    [HttpGet("queue")]
    [SwaggerOperation(Summary = "Get current user's track queue")]
    [CallsSpotifyApi(SpotifyScopes.UserReadPlaybackState)]
    public async Task<IEnumerable<TrackDto>> GetQueue()
    {
        var response = await Mediator.Send(new GetQueueQuery());

        return response;
    }

    [HttpGet("recently-played")]
    [SwaggerOperation(Summary = "Get current user's recently played tracks")]
    [CallsSpotifyApi(SpotifyScopes.UserReadRecentlyPlayed)]
    public async Task<IEnumerable<TrackDto>> GetRecentlyPlayed()
    {
        var response = await Mediator.Send(new GetRecentlyPlayedQuery());

        return response;
    }

    [HttpPut("shuffle")]
    [SwaggerOperation(Summary = "Toggle shuffle on or off")]
    [SwaggerResponse(statusCode: 202, "Accepted")]
    [CallsSpotifyApi(SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> Shuffle(bool state, ISpotifyPlaybackService playbackService)
    {
        await playbackService.ShufflePlayback(state);

        return Accepted();
    }

    [HttpPut("repeat-mode")]
    [SwaggerOperation(Summary = "Set the repeat mode for the user's playback")]
    [SwaggerResponse(statusCode: 202, "Accepted")]
    [CallsSpotifyApi(SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> SetRepeatMode(
        [SwaggerParameter("One of 'off', 'context', or 'track'")]
        string repeatMode)
    {
        await Mediator.Send(new SetRepeatModeCommand(repeatMode));

        return Accepted();
    }

    [HttpPut("play")]
    [SwaggerOperation(Summary = "Resume playback of current context")]
    [SwaggerResponse(statusCode: 202, "Accepted")]
    [CallsSpotifyApi(SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> Play(ISpotifyPlaybackService playbackService)
    {
        await playbackService.Play();

        return Accepted();
    }

    [HttpPut("pause")]
    [SwaggerOperation(Summary = "Pause playback of current context")]
    [SwaggerResponse(statusCode: 202, "Accepted")]
    [CallsSpotifyApi(SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> Pause(ISpotifyPlaybackService playbackService)
    {
        await playbackService.Pause();

        return Accepted();
    }

    [HttpPut("playback")]
    [SwaggerOperation(Summary = "Start new playback context")]
    [SwaggerResponse(statusCode: 202, "Accepted")]
    [SwaggerResponse(statusCode: 404, "Content is not available", typeof(Problem))]
    [CallsSpotifyApi(SpotifyScopes.UserReadPlaybackState, SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> PutPlayback(UpdatePlaybackRequestBody body)
    {
        var response = await Mediator.Send(new UpdatePlaybackCommand(body));
        if (!response.IsAvailable) return ProblemResponses.NotFound("Content is not available.");

        return Accepted();
    }

    [HttpPost("queue")]
    [SwaggerOperation(Summary = "Add to playback queue")]
    [SwaggerResponse(statusCode: 202, "Accepted")]
    [CallsSpotifyApi(SpotifyScopes.UserModifyPlaybackState)]
    public async Task<ActionResult> AddToQueue(AddToQueueRequestBody body, CurrentUserStore meStore)
    {
        var command = new AddToQueueCommand()
        {
            UserMarket = meStore.User!.Market,
            Body = body,
        };
        await Mediator.Send(command);

        return Accepted();
    }
}
