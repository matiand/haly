namespace Haly.WebApp.Features.Playlists;

public record PlaylistDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public IEnumerable<TrackDto> Tracks { get; init; }
}
