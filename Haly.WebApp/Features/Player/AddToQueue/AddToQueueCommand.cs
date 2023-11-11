using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.AddToQueue;

// Command must implement IRequest<Unit>, otherwise our ValidationBehavior for it won't work.
public record AddToQueueCommand : IRequest<Unit>
{
    public string UserMarket { get; init; }
    public AddToQueueRequestBody Body { get; init; }
};

public class AddToQueueCommandHandler : IRequestHandler<AddToQueueCommand, Unit>
{
    private readonly ISpotifyService _spotify;
    private readonly ISpotifyPlaybackService _playback;

    public AddToQueueCommandHandler(ISpotifyService spotify, ISpotifyPlaybackService playback)
    {
        _spotify = spotify;
        _playback = playback;
    }

    public async Task<Unit> Handle(AddToQueueCommand request, CancellationToken cancellationToken)
    {
        var trackUris = request.Body.TrackUris;

        if (request.Body.CollectionUri is not null)
        {
            var collectionId = GetCollectionIdFromUri(request.Body.CollectionUri);

            // Right now, we only allow albums.
            var album = await _spotify.GetAlbum(collectionId, request.UserMarket);
            trackUris = album.Tracks.Select(t => t.Uri!);
        }

        await _playback.AddToQueue(trackUris!);

        return Unit.Value;
    }

    private static string GetCollectionIdFromUri(string collectionUri)
    {
        return collectionUri.Split(":").Last();
    }
}
