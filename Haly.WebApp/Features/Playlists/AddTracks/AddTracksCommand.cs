using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.AddTracks;

public record AddTracksCommand : IRequest<AddTracksCommandResponse>
{
    public string PlaylistId { get; init; }
    public string UserMarket { get; init; }
    public AddTracksRequestBody Body { get; init; }
}

public class AddTracksCommandHandler : IRequestHandler<AddTracksCommand, AddTracksCommandResponse>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;

    public AddTracksCommandHandler(LibraryContext db, ISpotifyService spotify)
    {
        _db = db;
        _spotify = spotify;
    }

    public async Task<AddTracksCommandResponse> Handle(AddTracksCommand request, CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = _db.Playlists
            .Include(p => p.Tracks)
            .FirstOrDefaultAsync(p => p.Id == request.PlaylistId, cancellationToken);
        var trackUrisTask = CollectTrackUris(request);

        var (cachedPlaylist, trackUris) = (await cachedPlaylistTask, await trackUrisTask);

        if (cachedPlaylist is null || trackUris.Count == 0)
        {
            return new AddTracksCommandResponse(Playlist: null);
        }

        // Track uris that are not already in the playlist.
        var newTrackUris = trackUris.Where(uri => !cachedPlaylist.Tracks.Select(t => t.Uri).Contains(uri)).ToList();
        var hasDuplicates = newTrackUris.Count != trackUris.Count;

        if (hasDuplicates && request.Body.DuplicatesStrategy == DuplicatesStrategy.FailWhenAnyDuplicate)
        {
            var duplicateStatus = newTrackUris.Count == 0 ? DuplicateType.All : DuplicateType.Some;
            return new AddTracksCommandResponse(cachedPlaylist.Adapt<PlaylistBriefDto>(), duplicateStatus);
        }
        else if (hasDuplicates && request.Body.DuplicatesStrategy == DuplicatesStrategy.AddNewOnes)
        {
            await _spotify.AddTracks(request.PlaylistId, newTrackUris);
        }
        else
        {
            await _spotify.AddTracks(request.PlaylistId, trackUris);
        }

        var playlist = await UpdateCachedPlaylist(cachedPlaylist, request, cancellationToken);

        return new AddTracksCommandResponse(playlist.Adapt<PlaylistBriefDto>());
    }

    private async Task<List<string>> CollectTrackUris(AddTracksCommand request)
    {
        if (request.Body.TrackUris is not null)
        {
            return request.Body.TrackUris.ToList();
        }

        var collectionId = GetCollectionIdFromUri(request.Body.CollectionUri!);
        if (request.Body.CollectionUri!.Contains("album"))
        {
            var album = await _spotify.GetAlbum(collectionId, request.UserMarket);
            return album.Tracks.Select(t => t.Uri!).ToList();
        }
        else
        {
            var tracks = await _spotify.GetPlaylistTracks(collectionId, request.UserMarket);
            return tracks.Where(t => !string.IsNullOrEmpty(t.Uri)).Select(t => t.Uri!).ToList();
        }
    }

    private async Task<Playlist> UpdateCachedPlaylist(Playlist cachedPlaylist, AddTracksCommand request,
        CancellationToken cancellationToken)
    {
        var freshPlaylistTracks = await _spotify.GetPlaylistTracks(request.PlaylistId, request.UserMarket);

        cachedPlaylist.UpdateTracks(freshPlaylistTracks);
        await _db.SaveChangesAsync(cancellationToken);

        return cachedPlaylist;
    }

    private static string GetCollectionIdFromUri(string collectionUri)
    {
        return collectionUri.Split(":").Last();
    }
}
