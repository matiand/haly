using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.Pagination;

public class PaginatedListMappingProfile : IRegister
{
    private int PlaylistTrackLimit { get; } = 25;

    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Playlist, PlaylistWithTracksDto>()
            .Map(dest => dest.Tracks,
                src => new PaginatedList<TrackDto>(src.Tracks.Adapt<List<TrackDto>>(), PlaylistTrackLimit));
    }
}
