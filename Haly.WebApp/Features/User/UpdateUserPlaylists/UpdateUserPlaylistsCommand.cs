using Haly.WebApp.Data;
using Haly.WebApp.Events;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.UpdateUserPlaylists;

public record UpdateUserPlaylistsCommand(string Market) : IRequest<IEnumerable<UserPlaylistDto>?>;

public class
    UpdateUserPlaylistsCommandHandler : IRequestHandler<UpdateUserPlaylistsCommand, IEnumerable<UserPlaylistDto>?>
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
        var fetchedPlaylists = await _spotify.GetCurrentUserPlaylists();
        var fetchedIds = fetchedPlaylists.Select(p => p.Id);

        var cachedPlaylists = await _db.Playlists.Where(p => fetchedIds.Any(id => p.Id == id))
            .ToListAsync(cancellationToken: cancellationToken);
        var newPlaylists = fetchedPlaylists.ExceptBy(cachedPlaylists.Select(p => p.Id), p => p.Id);

        await UpdatePlaylists(cachedPlaylists, fetchedPlaylists, request.Market, cancellationToken);
        await AddPlaylists(newPlaylists, request.Market, cancellationToken);
        // No need to remove stuff, it will just stay in our db and if other user has that playlist it will be updated then

        // Use 'spotifyPlaylists' instead of calling our db, because we want them ordered just like in native app
        // and we don't store any order info on our side yet
        return fetchedPlaylists.Adapt<IEnumerable<UserPlaylistDto>>();
    }

    private async Task UpdatePlaylists(IEnumerable<Playlist> cachedPlaylists, IReadOnlyCollection<Playlist> newPlaylists, string market,
        CancellationToken cancellationToken)
    {
        foreach (var cachedPlaylist in cachedPlaylists)
        {
            var newPlaylist = newPlaylists.First(p => p.Id == cachedPlaylist.Id);

            if (cachedPlaylist.SnapshotId != newPlaylist.SnapshotId)
            {
                cachedPlaylist.Name = newPlaylist.Name;
                cachedPlaylist.SnapshotId = newPlaylist.SnapshotId;

                await _db.SaveChangesAsync(cancellationToken);
                await _mediator.Publish(new PlaylistUpserted(cachedPlaylist.Id, market), cancellationToken);
            }
        }
    }

    private async Task AddPlaylists(IEnumerable<Playlist> newPlaylists, string market,
        CancellationToken cancellationToken)
    {
        foreach (var newPlaylist in newPlaylists)
        {
            _db.Playlists.Add(newPlaylist);
            await _db.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new PlaylistUpserted(newPlaylist.Id, market), cancellationToken);
        }
    }
}
