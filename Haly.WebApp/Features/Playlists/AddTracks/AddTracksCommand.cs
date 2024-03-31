using Haly.WebApp.Data;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.AddTracks;

public record AddTracksCommand : IRequest<AddTracksCommandResponse>
{
    public string PlaylistId { get; init; }
    public string UserId { get; init; }
    public string UserMarket { get; init; }
    public AddTracksRequestBody Body { get; init; }
}

public class AddTracksCommandHandler(LibraryContext db, ISpotifyService spotify)
    : IRequestHandler<AddTracksCommand, AddTracksCommandResponse>
{
    public async Task<AddTracksCommandResponse> Handle(AddTracksCommand request, CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = db.Playlists
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
            await spotify.AddTracks(request.PlaylistId, newTrackUris);
        }
        else
        {
            await spotify.AddTracks(request.PlaylistId, trackUris);
        }

        await ScheduleBackgroundJobs(request, cancellationToken);

        return new AddTracksCommandResponse(cachedPlaylist.Adapt<PlaylistBriefDto>());
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
            var album = await spotify.GetAlbum(collectionId, request.UserMarket);
            return album.Tracks.Select(t => t.Uri!).ToList();
        }
        else
        {
            var tracks = await spotify.GetPlaylistTracks(collectionId, request.UserMarket);
            return tracks.Where(t => !string.IsNullOrEmpty(t.Uri)).Select(t => t.Uri!).ToList();
        }
    }

    private static string GetCollectionIdFromUri(string collectionUri)
    {
        return collectionUri.Split(":").Last();
    }

    private async Task ScheduleBackgroundJobs(AddTracksCommand request, CancellationToken cancellationToken)
    {
        var job = new RefetchPlaylistTracksJob()
        {
            UserId = request.UserId,
            PlaylistId = request.PlaylistId,
        };

        db.RefetchPlaylistTracksJobs.Add(job);
        await db.SaveChangesAsync(cancellationToken);
    }
}
