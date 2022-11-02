using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.UpdateUserPlaylists;

public record UpdateUserPlaylistsCommand(string UserId) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class UpdateUserPlaylistsHandler : IRequestHandler<UpdateUserPlaylistsCommand, IEnumerable<UserPlaylistDto>?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly List<Playlist> _playlistsWithStaleTracks = new();
    private readonly List<Playlist> _playlistsWithStalePhoto = new();

    public UpdateUserPlaylistsHandler(LibraryContext db, ISpotifyService spotify)
    {
        _db = db;
        _spotify = spotify;
    }

    public async Task<IEnumerable<UserPlaylistDto>?> Handle(UpdateUserPlaylistsCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _db.Users.Where(u => u.Id == request.UserId)
            .Include(u => u.LinkedPlaylists)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null) return null;

        var freshPlaylists = await _spotify.GetCurrentUserPlaylists();
        UpdateLinkedPlaylists(user, freshPlaylists);
        DeleteOldLinkedPlaylists(user, freshPlaylists);

        ScheduleBackgroundJobs(user, cancellationToken);

        await _db.SaveChangesAsync(cancellationToken);

        // todo: make this whole thing one transaction

        return user.LinkedPlaylists
            .OrderBy(playlist => playlist.Order)
            .Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private void UpdateLinkedPlaylists(Models.User user, List<Playlist> freshPlaylists)
    {
        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = user.LinkedPlaylists.FirstOrDefault(cp => cp.Id == freshPlaylist.Id);
            if (cachedPlaylist is not null)
            {
                if (cachedPlaylist.SnapshotId == freshPlaylist.SnapshotId &&
                    cachedPlaylist.Order == freshPlaylist.Order) continue;

                freshPlaylist.Tracks = cachedPlaylist.Tracks;

                // only pursue photo update if photo changed
                // _playlistsWithStalePhoto add

                user.LinkedPlaylists.Remove(cachedPlaylist);
            }

            user.LinkedPlaylists.Add(freshPlaylist);
            _playlistsWithStaleTracks.Add(freshPlaylist);
        }
    }

    // Delete playlists that the user is no longer linked to
    private void DeleteOldLinkedPlaylists(Models.User user, List<Playlist> freshPlaylists)
    {
        var freshPlaylistIds = freshPlaylists.Select(fp => fp.Id).ToList();

        user.LinkedPlaylists.RemoveAll(cp => !freshPlaylistIds.Contains(cp.Id));
    }

    private void ScheduleBackgroundJobs(Models.User user, CancellationToken cancellationToken)
    {
        var refetchTracksJobs = _playlistsWithStaleTracks.Select(p => new RefetchPlaylistTracksJob(user, p));
        _db.RefetchPlaylistTracksJobs.AddRange(refetchTracksJobs);
    }
}
