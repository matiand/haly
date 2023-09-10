using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.SetRepeatModeCommand;

// Command must be IRequest<Unit>, otherwise our ValidationBehavior for it won't work.
public record SetRepeatModeCommand(string RepeatMode) : IRequest<Unit>;

public class SetRepeatModeCommandHandler : IRequestHandler<SetRepeatModeCommand, Unit>
{
    private readonly ISpotifyService _spotifyService;

    public SetRepeatModeCommandHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<Unit> Handle(SetRepeatModeCommand request, CancellationToken cancellationToken)
    {
        await _spotifyService.SetPlaybackRepeatMode(request.RepeatMode);

        return Unit.Value;
    }
}
