using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("/Users/{userId}/player")]
[ApiController]
public class PlayerController : ApiControllerBase
{
    [HttpGet]
    [Route("devices")]
    [CallsSpotifyApi(SpotifyScopes.UserReadPlaybackState)]
    [SwaggerOperation(Summary = "Get available devices that current user can connect to")]
    public async Task<IEnumerable<DeviceDto>> GetAvailableDevices([FromServices] ISpotifyService spotifyService)
    {
        return await Mediator.Send(new GetAvailableDevicesQuery());
    }
}
