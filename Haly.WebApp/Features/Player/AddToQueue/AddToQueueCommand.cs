using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.AddToQueue;

// Command must implement IRequest<Unit>, otherwise our ValidationBehavior for it won't work.
public record AddToQueueCommand : IRequest<Unit>
{
    public string UserMarket { get; init; }
    public AddToQueueRequestBody Body { get; init; }
};

public class AddToQueueCommandHandler(ISpotifyService spotify, ISpotifyPlaybackService playback)
    : IRequestHandler<AddToQueueCommand, Unit>
{
    public async Task<Unit> Handle(AddToQueueCommand request, CancellationToken cancellationToken)
    {
        var trackUris = request.Body.TrackUris;

        if (request.Body.CollectionUri is not null)
        {
            var collectionId = GetCollectionIdFromUri(request.Body.CollectionUri);

            // Right now, we only allow albums.
            var album = await spotify.GetAlbum(collectionId, request.UserMarket);
            trackUris = album.Tracks.Select(t => t.Uri!);
        }

        await playback.AddToQueue(trackUris!);

        return Unit.Value;
    }

    private static string GetCollectionIdFromUri(string collectionUri)
    {
        return collectionUri.Split(":").Last();
    }
}
