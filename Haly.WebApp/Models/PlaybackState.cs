namespace Haly.WebApp.Models;

public record PlaybackState
{
    public Device Device { get; set; }
    public PlaybackContext? Context { get; set; }
}

public record PlaybackContext
{
    public string EntityId { get; set; }
    public string Type { get; set; }
}
