using FluentValidation;
using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public record GetPlaylistTracksQuery(string PlaylistId, int Limit = 25, int Offset = 0) : IRequest<PaginatedList<TrackDto>?>;

public class GetPlaylistTracksHandler : IRequestHandler<GetPlaylistTracksQuery, PaginatedList<TrackDto>?>
{
    private readonly LibraryContext _db;

    public GetPlaylistTracksHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<PaginatedList<TrackDto>?> Handle(GetPlaylistTracksQuery request,
        CancellationToken cancellationToken)
    {
        var playlist = await _db.Playlists.AnyAsync(p => p.Id == request.PlaylistId, cancellationToken);
        if (!playlist) return null;

        var tracks = await _db.Tracks
            .Where(t => t.PlaylistId == request.PlaylistId)
            .ToPaginatedListAsync(limit: request.Limit, offset: request.Offset, cancellationToken: cancellationToken);

        // We have to do the projection client side, cause it fails on server side
        return tracks.Adapt<PaginatedList<TrackDto>>();
    }
}

public class GetPlaylistTracksQueryValidator : AbstractValidator<GetPlaylistTracksQuery>
{
    public GetPlaylistTracksQueryValidator()
    {
        RuleFor(x => x.Limit).InclusiveBetween(from: 1, to: 100);
        RuleFor(x => x.Offset).GreaterThanOrEqualTo(valueToCompare: 0);
    }
}
