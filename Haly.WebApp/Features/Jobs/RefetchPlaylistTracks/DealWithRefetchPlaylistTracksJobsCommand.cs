using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Jobs.RefetchPlaylistTracks;

public record DealWithRefetchPlaylistTracksJobsCommand(string UserId) : IRequest<Unit?>;

public class DealWithRefetchPlaylistTracksJobsHandler : IRequestHandler<DealWithRefetchPlaylistTracksJobsCommand, Unit?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;

    public DealWithRefetchPlaylistTracksJobsHandler(LibraryContext db, ISpotifyService spotify)
    {
        _db = db;
        _spotify = spotify;
    }

    public async Task<Unit?> Handle(DealWithRefetchPlaylistTracksJobsCommand request, CancellationToken cancellationToken)
    {
        var user = await _db.Users
            .Include(user => user.RefetchPlaylistTracksJobs)
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.Id == request.UserId, cancellationToken);

        if (user is null) return null;

        foreach (var job in user.RefetchPlaylistTracksJobs.ToList())
        {
            var playlist = await _db.Playlists
                .Include(p => p.Tracks)
                .FirstOrDefaultAsync(p => p.Id == job.PlaylistId, cancellationToken);
            if (playlist is not null)
            {
                var tracks = await _spotify.GetPlaylistTracks(job.PlaylistId, user.Market);
                playlist.Tracks = tracks;
            }

            _db.Remove(job);

            // Treat each job as a transaction
            await _db.SaveChangesAsync(cancellationToken);
        }

        return Unit.Value;
    }
}
