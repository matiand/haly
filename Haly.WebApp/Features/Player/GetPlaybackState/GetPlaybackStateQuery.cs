using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Player.GetPlaybackState;

public record GetPlaybackStateQuery : IRequest<PlaybackStateDto?>;

public record GetPlaybackStateHandler : IRequestHandler<GetPlaybackStateQuery, PlaybackStateDto?>
{
    private readonly ISpotifyService _spotifyService;

    public GetPlaybackStateHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<PlaybackStateDto?> Handle(GetPlaybackStateQuery request, CancellationToken cancellationToken)
    {
        var playbackState = await _spotifyService.GetPlaybackState();

        return playbackState?.Adapt<PlaybackStateDto>();
    }
}
