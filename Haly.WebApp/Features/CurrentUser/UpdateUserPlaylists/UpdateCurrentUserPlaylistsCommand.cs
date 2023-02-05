using System.Diagnostics.CodeAnalysis;
using Haly.WebApp.Data;
using Haly.WebApp.Hubs;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateUserPlaylists;

public record UpdateCurrentUserPlaylistsCommand(string UserId) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class
    UpdateCurrentUserPlaylistsHandler : IRequestHandler<UpdateCurrentUserPlaylistsCommand, IEnumerable<UserPlaylistDto>
        ?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly IHubContext<MessageHub, IMessageHubClient> _messageHub;
    private readonly List<Playlist> _playlistsWithOldTracks = new();
    private readonly List<Playlist> _playlistsWithOldPhoto = new();

    public UpdateCurrentUserPlaylistsHandler(LibraryContext db, ISpotifyService spotify,
        IHubContext<MessageHub, IMessageHubClient> messageHub)
    {
        _db = db;
        _spotify = spotify;
        _messageHub = messageHub;
    }

    [SuppressMessage("ReSharper.DPA", "DPA0006: Large number of DB commands", MessageId = "count: 5")]
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
        await _messageHub.Clients.All.PlaylistsWithOldTracks(_playlistsWithOldTracks.Select(p => p.Id));

        return response.PlaylistsOrder
            .Select(playlistId => user.LinkedPlaylists.First(item => item.Id == playlistId))
            .Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private void UpdateLinkedPlaylists(Models.User user, List<Playlist> freshPlaylists)
    {
        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = user.LinkedPlaylists.FirstOrDefault(cp => cp.Id == freshPlaylist.Id);
            if (cachedPlaylist is not null)
            {
                if (cachedPlaylist.SnapshotId == freshPlaylist.SnapshotId) continue;

                freshPlaylist.Tracks = cachedPlaylist.Tracks;

                // only pursue photo update if photo changed
                // _playlistsWithStalePhoto add

                user.LinkedPlaylists.Remove(cachedPlaylist);
            }

            user.LinkedPlaylists.Add(freshPlaylist);
            _playlistsWithOldTracks.Add(freshPlaylist);
        }
    }

    // Delete playlists that the user is no longer linked to
    private static void DeleteOldLinkedPlaylists(Models.User user, List<Playlist> freshPlaylists)
    {
        var freshPlaylistIds = freshPlaylists.Select(fp => fp.Id).ToList();

        user.LinkedPlaylists.RemoveAll(cp => !freshPlaylistIds.Contains(cp.Id));
    }

    private void ScheduleBackgroundJobs(Models.User user)
    {
        var refetchTracksJobs = _playlistsWithOldTracks.Select(p => new RefetchPlaylistTracksJob(user, p));
        _db.RefetchPlaylistTracksJobs.AddRange(refetchTracksJobs);
    }
}
