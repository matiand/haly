namespace Haly.WebApp.Features.Player.GetAvailableDevices;

public record DeviceDto
{
    public string Id { get; init; }
    public bool IsActive { get; init; }
    public string Name { get; init; }
    public int VolumePercent { get; init; }
}
