using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.AddToQueue;

// Command must implement IRequest<Unit>, otherwise our ValidationBehavior for it won't work.
public record AddToQueueCommand : IRequest<Unit>
{
    public string? CollectionUri { get; init; }
    public IEnumerable<string>? TrackUris { get; init; }
};

public class AddToQueueCommandHandler : IRequestHandler<AddToQueueCommand, Unit>
{
    private readonly ISpotifyPlaybackService _spotify;

    public AddToQueueCommandHandler(ISpotifyPlaybackService spotify)
    {
        _spotify = spotify;
    }

    public async Task<Unit> Handle(AddToQueueCommand request, CancellationToken cancellationToken)
    {
        if (request.CollectionUri is not null)
        {
            await _spotify.AddToQueue(request.CollectionUri);
        }
        else
        {
            await _spotify.AddToQueue(request.TrackUris!);
        }

        return Unit.Value;
    }
}
