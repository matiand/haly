namespace Haly.WebApp.Models;

public record Device
{
    public string Id { get; init; }
    public string Name { get; init; }
    public bool IsActive { get; init; }
    public string Type { get; init; }
    public int VolumePercent { get; init; }
}
