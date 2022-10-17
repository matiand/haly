using System.Text.Json.Serialization;
using Haly.WebApp.Models;

namespace Haly.WebApp.Features.Playlists;

public record TrackDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public DateTimeOffset AddedAt { get; init; }
    public TrackType Type { get; init; }

    public AlbumDto Album { get; init; }
    public IEnumerable<ArtistDto> Artists { get; init; }
}
