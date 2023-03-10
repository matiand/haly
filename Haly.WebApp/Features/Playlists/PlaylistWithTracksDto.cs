using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.Playlists;

public record PlaylistWithTracksDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public PlaylistMetadataDto Metadata { get; set; }
    public PaginatedList<TrackDto> Tracks { get; set; }
}

public class PaginatedListMappingProfile : IRegister
{
    private int PlaylistTrackLimit { get; } = 25;

    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Playlist, PlaylistWithTracksDto>()
            .Map(dest => dest.Tracks,
                src => new PaginatedList<TrackDto>(src.Tracks.Adapt<List<TrackDto>>(), PlaylistTrackLimit, 0));
    }
}
