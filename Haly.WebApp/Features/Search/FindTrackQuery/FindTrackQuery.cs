using Haly.WebApp.Data;
using Haly.WebApp.Features.Player;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Search.FindTrackQuery;

public record FindTrackQuery(string PlaylistId, string TrackPlaybackId) : IRequest<TrackSearchResultDto>;

public class FindTrackQueryHandler : IRequestHandler<FindTrackQuery, TrackSearchResultDto>
{
    private readonly LibraryContext _db;

    public FindTrackQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<TrackSearchResultDto> Handle(FindTrackQuery request, CancellationToken cancellationToken)
    {
        var track = await _db.PlaylistTracks.FirstOrDefaultAsync(
            track => track.PlaylistId == request.PlaylistId && track.PlaybackId == request.TrackPlaybackId,
            cancellationToken);

        return new TrackSearchResultDto(track?.Adapt<TrackDto>());
    }
}
