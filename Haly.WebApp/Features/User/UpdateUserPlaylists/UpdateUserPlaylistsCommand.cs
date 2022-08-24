using Haly.WebApp.Data;
using Haly.WebApp.Events;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.UpdateUserPlaylists;

public record UpdateUserPlaylistsCommand(string UserId) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class UpdateUserPlaylistsCommandHandler : IRequestHandler<UpdateUserPlaylistsCommand, IEnumerable<UserPlaylistDto>?>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;
    private readonly IPublisher _mediator;

    public UpdateUserPlaylistsCommandHandler(LibraryContext db, ISpotifyService spotify, IPublisher mediator)
    {
        _db = db;
        _spotify = spotify;
        _mediator = mediator;
    }

    public async Task<IEnumerable<UserPlaylistDto>?> Handle(UpdateUserPlaylistsCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _db.Users.Include(u => u.Playlists)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);
        if (user is null) return null;

        var spotifyPlaylists = await _spotify.GetCurrentUserPlaylists();
        var cachedPlaylists = user.Playlists;

        var newPlaylists = spotifyPlaylists.ExceptBy(cachedPlaylists.Select(p => p.Id), p => p.Id);
        var removedPlaylists = cachedPlaylists.ExceptBy(spotifyPlaylists.Select(p => p.Id), p => p.Id);
        var existingPlaylists = spotifyPlaylists.IntersectBy(cachedPlaylists.Select(p => p.Id), p => p.Id);

        await AddPlaylists(user, newPlaylists, cancellationToken);
        await UpdatePlaylists(user, existingPlaylists, cachedPlaylists, cancellationToken);
        await RemovePlaylists(removedPlaylists, cancellationToken);

        // Use 'spotifyPlaylists' instead of calling our db, because we want them ordered just like in native app
        // and we don't store any order info on our side yet
        return spotifyPlaylists.Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private async Task AddPlaylists(Models.User user, IEnumerable<Playlist> newPlaylists,
        CancellationToken cancellationToken)
    {
        foreach (var newPlaylist in newPlaylists)
        {
            newPlaylist.OwnerId = user.Id;

            _db.Playlists.Add(newPlaylist);
            await _db.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new PlaylistUpserted(newPlaylist.Id, user.Market), cancellationToken);
        }
    }

    private async Task UpdatePlaylists(Models.User user, IEnumerable<Playlist> freshPlaylists,
        IReadOnlyCollection<Playlist> cachedPlaylists,
        CancellationToken cancellationToken)
    {
        foreach (var freshPlaylist in freshPlaylists)
        {
            var cachedPlaylist = cachedPlaylists.First(p => p.Id == freshPlaylist.Id);

            if (freshPlaylist.SnapshotId != cachedPlaylist.SnapshotId)
            {
                cachedPlaylist.Name = freshPlaylist.Name;
                cachedPlaylist.SnapshotId = freshPlaylist.SnapshotId;

                await _db.SaveChangesAsync(cancellationToken);
                await _mediator.Publish(new PlaylistUpserted(cachedPlaylist.Id, user.Market), cancellationToken);
            }
        }
    }

    private async Task RemovePlaylists(IEnumerable<Playlist> removedPlaylists, CancellationToken cancellationToken)
    {
        _db.Playlists.RemoveRange(removedPlaylists);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
