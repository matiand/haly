namespace Haly.WebApp.Models;

public abstract class TrackableEntity
{
    public DateOnly? UpdatedAt { get; set; }
}
