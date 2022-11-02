using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.GetAvailableDevices;

public record GetAvailableDevicesQuery : IRequest<IEnumerable<DeviceDto>>;

public record GetAvailableDevicesHandler : IRequestHandler<GetAvailableDevicesQuery, IEnumerable<DeviceDto>>
{
    private readonly ISpotifyService _spotifyService;

    public GetAvailableDevicesHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<IEnumerable<DeviceDto>> Handle(GetAvailableDevicesQuery request, CancellationToken cancellationToken)
    {
        return await _spotifyService.GetAvailableDevices();
    }
}
