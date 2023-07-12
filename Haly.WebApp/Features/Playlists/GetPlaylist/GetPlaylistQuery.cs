using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public record GetPlaylistQuery(string Id) : IRequest<PlaylistWithTracksDto?>
{
    public int TracksLimit { get; } = 25;
}

public class GetPlaylistHandler : IRequestHandler<GetPlaylistQuery, PlaylistWithTracksDto?>
{
    private readonly LibraryContext _db;
    private readonly ITotalDurationService _totalDurationService;

    public GetPlaylistHandler(LibraryContext db, ITotalDurationService totalDurationService)
    {
        _db = db;
        _totalDurationService = totalDurationService;
    }

    public async Task<PlaylistWithTracksDto?> Handle(GetPlaylistQuery request, CancellationToken cancellationToken)
    {
        var dbPlaylist = await _db.Playlists
            .Where(p => p.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (dbPlaylist is null) return null;

        // Avoid using ProjectToType extension, it's buggy and usually performs worse than Adapt
        dbPlaylist.Tracks = new List<PlaylistTrack>();
        var playlist = dbPlaylist.Adapt<PlaylistWithTracksDto>();

        var tracks = await _db.PlaylistTracks
            .Where(t => t.PlaylistId == request.Id)
            .OrderBy(t => t.PositionInPlaylist)
            .ToPaginatedListAsync(offset: 0, request.TracksLimit, cancellationToken);

        playlist.Tracks = tracks.Adapt<PaginatedList<PlaylistTrackDto>>();

        var totalDuration = await _totalDurationService.FromPlaylistStore(request.Id);
        playlist.TotalDuration = totalDuration.Format();

        return playlist;
    }
}
