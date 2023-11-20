namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTrackDto
{
    public string Uri { get; init; }
    public IEnumerable<int> Positions { get; init; }
}
