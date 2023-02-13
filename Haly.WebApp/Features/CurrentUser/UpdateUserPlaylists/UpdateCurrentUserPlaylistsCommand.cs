using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateUserPlaylists;

public record UpdateCurrentUserPlaylistsCommand(string UserId) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class
    UpdateCurrentUserPlaylistsHandler : IRequestHandler<UpdateCurrentUserPlaylistsCommand, IEnumerable<UserPlaylistDto>
        ?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly List<Playlist> _playlistsWithOldTracks = new();

    public UpdateCurrentUserPlaylistsHandler(LibraryContext db, ISpotifyService spotify)
    {
        _db = db;
        _spotify = spotify;
    }

    public async Task<IEnumerable<UserPlaylistDto>?> Handle(UpdateCurrentUserPlaylistsCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _db.Users.Where(u => u.Id == request.UserId)
            .Include(u => u.LinkedPlaylists)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null) return null;

        var response = await _spotify.GetCurrentUserPlaylists();

        UpdateLinkedPlaylists(user, response.Playlists);
        DeleteOldLinkedPlaylists(user, response.Playlists);
        ScheduleBackgroundJobs(user);

        await _db.SaveChangesAsync(cancellationToken);

        return response.PlaylistsOrder
            .Select(playlistId => user.LinkedPlaylists.First(item => item.Id == playlistId))
            .Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private void UpdateLinkedPlaylists(User user, List<Playlist> freshPlaylists)
    {
        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = user.LinkedPlaylists.FirstOrDefault(cp => cp.Id == freshPlaylist.Id);
            if (cachedPlaylist is not null)
            {
                if (cachedPlaylist.SnapshotId == freshPlaylist.SnapshotId) continue;

                freshPlaylist.Tracks = cachedPlaylist.Tracks;
                user.LinkedPlaylists.Remove(cachedPlaylist);
            }

            user.LinkedPlaylists.Add(freshPlaylist);
            _playlistsWithOldTracks.Add(freshPlaylist);
        }
    }

    // Delete playlists that the user is no longer linked to
    private static void DeleteOldLinkedPlaylists(User user, List<Playlist> freshPlaylists)
    {
        var freshPlaylistIds = freshPlaylists.Select(fp => fp.Id).ToList();

        user.LinkedPlaylists.RemoveAll(cp => !freshPlaylistIds.Contains(cp.Id));
    }

    private void ScheduleBackgroundJobs(User user)
    {
        var refetchTracksJobs = _playlistsWithOldTracks.Select(p => new RefetchPlaylistTracksJob(user, p));
        _db.RefetchPlaylistTracksJobs.AddRange(refetchTracksJobs);
    }
}
