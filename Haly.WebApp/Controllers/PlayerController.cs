using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Features.Player.GetPlaybackState;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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
    public async Task<ActionResult> TransferPlayback(string deviceId, [FromServices] ISpotifyService spotifyService)
    {
        await spotifyService.TransferPlayback(deviceId);

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
}
