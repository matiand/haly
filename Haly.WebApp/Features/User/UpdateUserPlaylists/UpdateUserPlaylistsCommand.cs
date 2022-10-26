using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.UpdateUserPlaylists;

public record UpdateUserPlaylistsCommand(string UserId) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class
    UpdateUserPlaylistsCommandHandler : IRequestHandler<UpdateUserPlaylistsCommand, IEnumerable<UserPlaylistDto>?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly List<Playlist> _playlistsWithStaleTracks = new();
    private readonly List<Playlist> _playlistsWithStalePhoto = new();

    public UpdateUserPlaylistsCommandHandler(LibraryContext db, ISpotifyService spotify)
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
        DeleteUnlinkedPlaylists(user, freshPlaylists);

        await _db.SaveChangesAsync(cancellationToken);

        // ScheduleBackgroundJobs(user, cancellationToken);

        return user.LinkedPlaylists
            .OrderBy(playlist => playlist.Order)
            .Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private static void UpdateLinkedPlaylists(Models.User user, List<Playlist> freshPlaylists)
    {
        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = user.LinkedPlaylists.FirstOrDefault(cp => cp.Id == freshPlaylist.Id);
            if (cachedPlaylist is not null)
            {
                // and order has to be the same
                if (cachedPlaylist.SnapshotId == freshPlaylist.SnapshotId &&
                    cachedPlaylist.Order == freshPlaylist.Order) continue;

                freshPlaylist.Tracks = cachedPlaylist.Tracks;
                // _playlistsWithStaleTracks add

                // only pursue photo update if photo changed
                // _playlistsWithStalePhoto add

                user.LinkedPlaylists.Remove(cachedPlaylist);
            }

            user.LinkedPlaylists.Add(freshPlaylist);
        }
    }

    // Delete playlists that the user is no longer linked to
    private void DeleteUnlinkedPlaylists(Models.User user, List<Playlist> freshPlaylists)
    {
        var freshPlaylistIds = freshPlaylists.Select(fp => fp.Id).ToList();

        user.LinkedPlaylists.RemoveAll(cp => !freshPlaylistIds.Contains(cp.Id));
    }
}
