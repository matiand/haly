namespace Haly.WebApp.Features.Playlists;

public record TrackDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public DateTimeOffset AddedAt { get; init; }

    public AlbumDto Album { get; init; }
    public IEnumerable<ArtistDto> Artists { get; init; }
}
