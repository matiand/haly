using Haly.WebApp.Data;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdatePlaylists;

public record UpdateMyPlaylistsCommand(string UserId) : IRequest<IEnumerable<PlaylistBriefDto>?>;

public class UpdateMyPlaylistsHandler : IRequestHandler<UpdateMyPlaylistsCommand, IEnumerable<PlaylistBriefDto>?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly IDateOnlyService _dateOnlyService;

    private readonly List<Playlist> _oldPlaylists = new();
    private readonly List<Playlist> _changedPlaylists = new();

    public UpdateMyPlaylistsHandler(LibraryContext db, ISpotifyService spotify, IDateOnlyService dateOnlyService)
    {
        _db = db;
        _spotify = spotify;
        _dateOnlyService = dateOnlyService;
    }

    public async Task<IEnumerable<PlaylistBriefDto>?> Handle(UpdateMyPlaylistsCommand request,
        CancellationToken cancellationToken)
    {
        var userTask = _db.Users.Where(u => u.Id == request.UserId).FirstOrDefaultAsync(cancellationToken);
        var responseTask = _spotify.GetCurrentUserPlaylists();
        var (user, response) = (await userTask, await responseTask);

        if (user is null) return null;

        user.LinkedPlaylistsOrder = response.PlaylistOrder;
        await UpdateLinkedPlaylists(user, response.Playlists);
        ScheduleBackgroundJobs(user);

        await _db.SaveChangesAsync(cancellationToken);

        return user.LinkedPlaylistsOrder
            .Select(playlistId => response.Playlists.First(item => item.Id == playlistId))
            .Adapt<IEnumerable<PlaylistBriefDto>>();
    }

    private async Task UpdateLinkedPlaylists(PrivateUser user, List<Playlist> freshPlaylists)
    {
        var cachedPlaylists = await _db.Playlists
            .Where(cp => user.LinkedPlaylistsOrder.Any(pId => pId == cp.Id))
            .ToListAsync();

        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = cachedPlaylists.FirstOrDefault(cp => cp.Id == freshPlaylist.Id);
            if (cachedPlaylist is not null)
            {
                if (_dateOnlyService.IsOlderThanAMonth(cachedPlaylist.UpdatedAt))
                {
                    _oldPlaylists.Add(cachedPlaylist);
                }

                if (cachedPlaylist.SnapshotId == freshPlaylist.SnapshotId) continue;

                cachedPlaylist.UpdateModel(freshPlaylist);
                _changedPlaylists.Add(cachedPlaylist);
            }
            else
            {
                _db.Playlists.Add(freshPlaylist);
                _changedPlaylists.Add(freshPlaylist);
            }
        }
    }

    private void ScheduleBackgroundJobs(PrivateUser user)
    {
        // We want playlists that are older than a month but still have the same SnapshotId to
        // update their tracks, because those tracks might have new PlaybackId (happens when the
        // license expires) and we prefer to have those up to date.

        var refetchTracksJobs = _oldPlaylists.Concat(_changedPlaylists)
            .DistinctBy(p => p.Id)
            .Select(p => new RefetchPlaylistTracksJob(user, p));

        _db.RefetchPlaylistTracksJobs.AddRange(refetchTracksJobs);
    }
}
