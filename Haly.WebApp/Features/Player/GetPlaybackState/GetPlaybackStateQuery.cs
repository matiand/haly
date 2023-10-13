using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Player.GetPlaybackState;

public record GetPlaybackStateQuery : IRequest<PlaybackStateDto?>;

public record GetPlaybackStateHandler : IRequestHandler<GetPlaybackStateQuery, PlaybackStateDto?>
{
    private readonly ISpotifyPlaybackService _spotify;

    public GetPlaybackStateHandler(ISpotifyPlaybackService spotify)
    {
        _spotify = spotify;
    }

    public async Task<PlaybackStateDto?> Handle(GetPlaybackStateQuery request, CancellationToken cancellationToken)
    {
        var playbackState = await _spotify.GetPlaybackState();

        return playbackState?.Adapt<PlaybackStateDto>();
    }
}
