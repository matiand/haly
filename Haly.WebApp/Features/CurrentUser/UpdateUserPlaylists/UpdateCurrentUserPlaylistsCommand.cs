using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateUserPlaylists;

public record UpdateCurrentUserPlaylistsCommand(string UserId) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class UpdateCurrentUserPlaylistsHandler
    : IRequestHandler<UpdateCurrentUserPlaylistsCommand, IEnumerable<UserPlaylistDto>?>
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
        var userTask = _db.Users.Where(u => u.Id == request.UserId).FirstOrDefaultAsync(cancellationToken);
        var responseTask = _spotify.GetCurrentUserPlaylists();
        var (user, response) = (await userTask, await responseTask);

        if (user is null) return null;

        user.LinkedPlaylistsOrder = response.PlaylistsOrder;
        await UpdateLinkedPlaylists(user, response.Playlists);
        ScheduleBackgroundJobs(user);

        await _db.SaveChangesAsync(cancellationToken);

        return user.LinkedPlaylistsOrder
            .Select(playlistId => response.Playlists.First(item => item.Id == playlistId))
            .Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private async Task UpdateLinkedPlaylists(User user, List<Playlist> freshPlaylists)
    {
        var cachedPlaylists = await _db.Playlists
            .Where(cp => user.LinkedPlaylistsOrder.Any(pId => pId == cp.Id))
            .ToListAsync();

        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = cachedPlaylists.FirstOrDefault(cp => cp.Id == freshPlaylist.Id);
            if (cachedPlaylist is not null)
            {
                if (cachedPlaylist.SnapshotId == freshPlaylist.SnapshotId) continue;

                cachedPlaylist.UpdateModel(freshPlaylist);
                _playlistsWithOldTracks.Add(cachedPlaylist);
            }
            else
            {
                _db.Playlists.Add(freshPlaylist);
                _playlistsWithOldTracks.Add(freshPlaylist);
            }
        }
    }

    private void ScheduleBackgroundJobs(User user)
    {
        var refetchTracksJobs = _playlistsWithOldTracks.Select(p => new RefetchPlaylistTracksJob(user, p));
        _db.RefetchPlaylistTracksJobs.AddRange(refetchTracksJobs);
    }
}
