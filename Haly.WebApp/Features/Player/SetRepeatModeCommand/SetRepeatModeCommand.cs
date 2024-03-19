using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.SetRepeatModeCommand;

// Command must implement IRequest<Unit>, otherwise our ValidationBehavior for it won't work.
public record SetRepeatModeCommand(string RepeatMode) : IRequest<Unit>;

public class SetRepeatModeCommandHandler(ISpotifyPlaybackService spotify) : IRequestHandler<SetRepeatModeCommand, Unit>
{
    public async Task<Unit> Handle(SetRepeatModeCommand request, CancellationToken cancellationToken)
    {
        await spotify.SetPlaybackRepeatMode(request.RepeatMode);

        return Unit.Value;
    }
}
