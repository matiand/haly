using System.Net;
using Haly.GeneratedClients;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

public record UpdatePlaybackCommand(string ContextUri, string? TrackUri, bool WithImprovedShuffle)
    : IRequest<UpdatePlaybackResponse>;

public class UpdatePlaybackCommandHandler : IRequestHandler<UpdatePlaybackCommand, UpdatePlaybackResponse>
{
    private readonly ISpotifyPlaybackService _spotify;

    public UpdatePlaybackCommandHandler(ISpotifyPlaybackService spotify)
    {
        _spotify = spotify;
    }

    public async Task<UpdatePlaybackResponse> Handle(UpdatePlaybackCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await _spotify.UpdatePlayback(request.ContextUri, request.TrackUri);
        }
        catch (ApiException e)
        {
            // They return this code when content is not available.
            if (e.StatusCode == (int)HttpStatusCode.BadGateway)
            {
                return new UpdatePlaybackResponse(IsAvailable: false);
            }

            throw;
        }

        await HandleShuffleFlag(request);

        return new UpdatePlaybackResponse(IsAvailable: true);
    }

    private async Task HandleShuffleFlag(UpdatePlaybackCommand request)
    {
        if (request.WithImprovedShuffle)
        {
            var playbackState = await _spotify.GetPlaybackState();
            if (playbackState?.IsShuffled ?? false)
            {
                await _spotify.ShufflePlayback(state: true);
            }
        }
    }
}
