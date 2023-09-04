using Haly.WebApp.Features.Player.GetAvailableDevices;

namespace Haly.WebApp.Features.Player.GetPlaybackState;

public record PlaybackStateDto
{
    public DeviceDto Device { get; init; }
    public PlaybackContextDto? Context { get; init; }
}
