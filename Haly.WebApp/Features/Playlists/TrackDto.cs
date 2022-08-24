using System.Globalization;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.Playlists;

public record TrackDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Duration { get; init; }
    public string AddedAt { get; init; }

    public AlbumDto Album { get; init; }
    public IEnumerable<ArtistDto> Artists { get; init; }
}

public class TrackMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Track, TrackDto>()
            .Map(dto => dto.Duration, src => TimeSpan.FromMilliseconds(src.DurationInMs)
                .ToString(@"m\:ss", CultureInfo.InvariantCulture))
            .Map(dto => dto.AddedAt, src => src.AddedAt.ToString("o", CultureInfo.InvariantCulture));
    }
}
