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

        if (cachedPlaylist is null)
        {
            return new AddTracksCommandResponse(Playlist: null, AllDuplicates: false, SomeDuplicates: false);
        }

        var (allDuplicates, someDuplicates) = CheckForDuplicates(cachedPlaylist, trackUris);
        if (!someDuplicates || request.Body.AllowDuplicates)
        {
            await _spotify.AddTracks(request.PlaylistId, trackUris);
            await UpdateCachedPlaylist(cachedPlaylist, request, cancellationToken);
        }

        var playlistDto = cachedPlaylist.Adapt<PlaylistBriefDto>();
        return new AddTracksCommandResponse(Playlist: playlistDto, allDuplicates, someDuplicates);
    }

    private async Task<List<string>> CollectTrackUris(AddTracksCommand request)
    {
        if (request.Body.TrackUris is not null)
        {
            return request.Body.TrackUris.ToList();
        }

        if (request.Body.CollectionUri!.Contains("album"))
        {
            var album = await _spotify.GetAlbum(request.Body.CollectionUri, request.UserMarket);
            return album.Tracks.Select(t => t.Uri!).ToList();
        }
        else
        {
            var tracks = await _spotify.GetPlaylistTracks(request.Body.CollectionUri, request.UserMarket);
            return tracks.Where(t => string.IsNullOrEmpty(t.Uri)).Select(t => t.Uri!).ToList();
        }
    }

    private static (bool all, bool some) CheckForDuplicates(Playlist cachedPlaylist, List<string> trackUrisToAdd)
    {
        var allDuplicates = trackUrisToAdd.All(uri => cachedPlaylist.Tracks.Any(track => track.Uri == uri));
        var someDuplicates = trackUrisToAdd.Any(uri => cachedPlaylist.Tracks.Any(track => track.Uri == uri));

        return (allDuplicates, someDuplicates);
    }

    private async Task UpdateCachedPlaylist(Playlist cachedPlaylist, AddTracksCommand request,
        CancellationToken cancellationToken)
    {
        var freshPlaylistTracks = await _spotify.GetPlaylistTracks(request.PlaylistId, request.UserMarket);

        cachedPlaylist.Tracks = freshPlaylistTracks;
        await _db.SaveChangesAsync(cancellationToken);
    }
}
