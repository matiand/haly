namespace Haly.WebApp.Models;

public record Device
{
    public string Id { get; init; }
    public string Name { get; init; }
    public bool IsActive { get; init; }
    public string Type { get; init; }

    /// <summary>
    /// Represents the volume percentage as a whole number from 0 to 100.
    /// </summary>
    public int VolumePercent { get; init; }

    /// <summary>
    /// Represents the volume as a decimal number.
    /// </summary>
    public double Volume => (double)VolumePercent / 100;
}
