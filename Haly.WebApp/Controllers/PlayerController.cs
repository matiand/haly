using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

[Route("/Me/[controller]")]
public class PlayerController : ApiControllerBase
{
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
