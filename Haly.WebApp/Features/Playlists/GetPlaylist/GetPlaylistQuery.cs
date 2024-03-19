using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.Models.Tracks;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public record GetPlaylistQuery(string Id, string? SortOrder) : IRequest<PlaylistWithTracksDto?>
{
    public int TracksLimit { get; } = 25;
}

public class GetPlaylistHandler(LibraryContext db, ITotalDurationService totalDurationService)
    : IRequestHandler<GetPlaylistQuery, PlaylistWithTracksDto?>
{
    public async Task<PlaylistWithTracksDto?> Handle(GetPlaylistQuery request, CancellationToken cancellationToken)
    {
        var playlist = await db.Playlists
            .Where(p => p.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (playlist is null) return null;

        // Avoid using ProjectToType extension, it's buggy and usually performs worse than Adapt
        playlist.Tracks = new List<PlaylistTrack>();
        var dto = playlist.Adapt<PlaylistWithTracksDto>();

        var tracks = db.PlaylistTracks
            .Where(t => t.PlaylistId == request.Id)
            .OrderBy(request.SortOrder);

        var page = await tracks.ToPaginatedListAsync(offset: 0, request.TracksLimit, cancellationToken);
        var totalDuration = await totalDurationService.FromQueryable(tracks);

        dto.Tracks = page.Adapt<PaginatedList<PlaylistTrackDto>>();
        dto.TotalDuration = totalDuration.Format();

        return dto;
    }
}
