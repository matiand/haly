using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

public record UpdatePlaybackCommand(string ContextUri, string? TrackUri) : IRequest<Unit>;

public class UpdatePlaybackCommandHandler : IRequestHandler<UpdatePlaybackCommand, Unit>
{
    private readonly ISpotifyService _spotify;

    public UpdatePlaybackCommandHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<Unit> Handle(UpdatePlaybackCommand request, CancellationToken cancellationToken)
    {
        await _spotify.UpdatePlayback(request.ContextUri, request.TrackUri);

        return Unit.Value;
    }
}
