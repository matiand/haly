using Haly.WebApp.Data;
using Haly.WebApp.Features.Player;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Search.FindTrack;

public record FindTrackQuery(string PlaylistId, string TrackPlaybackId) : IRequest<FindTrackQueryResponse>;

public class FindTrackQueryHandler : IRequestHandler<FindTrackQuery, FindTrackQueryResponse>
{
    private readonly LibraryContext _db;

    public FindTrackQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<FindTrackQueryResponse> Handle(FindTrackQuery request, CancellationToken cancellationToken)
    {
        var track = await _db.PlaylistTracks.FirstOrDefaultAsync(
            track => track.PlaylistId == request.PlaylistId && track.PlaybackId == request.TrackPlaybackId,
            cancellationToken);

        return new FindTrackQueryResponse(track?.Adapt<TrackDto>());
    }
}
