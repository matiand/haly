namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTrackDto
{
    public string Uri { get; init; }
    public int Position { get; init; }
}
