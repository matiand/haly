namespace Haly.WebApp.Features.Player.GetAvailableDevices;

public record DeviceDto
{
    public string Id { get; set; }
    public bool IsActive { get; set; }
    public string Name { get; set; }
    public int VolumePercent { get; set; }
}
