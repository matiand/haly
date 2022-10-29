using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Jobs.RefetchPlaylistTracks;

public record RefetchPlaylistTracksCommand(string UserId) : IRequest<Unit?>;

public class RefetchPlaylistTracksCommandHandler : IRequestHandler<RefetchPlaylistTracksCommand, Unit?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;

    public RefetchPlaylistTracksCommandHandler(LibraryContext db, ISpotifyService spotify)
    {
        _db = db;
        _spotify = spotify;
    }

    public async Task<Unit?> Handle(RefetchPlaylistTracksCommand request, CancellationToken cancellationToken)
    {
        var user = await _db.Users
            .Include(user => user.RefetchPlaylistTracksJobs)
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.Id == request.UserId, cancellationToken);

        if (user is null) return null;

        foreach (var job in user.RefetchPlaylistTracksJobs.ToList())
        {
            var tracks = await _spotify.GetPlaylistTracks(job.PlaylistId, user.Market);
            var playlist = await _db.Playlists.FirstOrDefaultAsync(p => p.Id == job.PlaylistId, cancellationToken);

            // todo: ignore if playlist does not exist
            // todo: make sure old tracks are removed
            playlist!.Tracks = tracks;
            _db.Remove(job);

            // Treat each job as a transaction
            await _db.SaveChangesAsync(cancellationToken);
        }

        return Unit.Value;
    }
}
