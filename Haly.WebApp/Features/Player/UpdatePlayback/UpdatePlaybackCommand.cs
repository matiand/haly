using System.Net;
using Haly.GeneratedClients;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

public record UpdatePlaybackCommand(UpdatePlaybackRequestBody Body) : IRequest<UpdatePlaybackCommandResponse>;

public class UpdatePlaybackCommandHandler(ISpotifyPlaybackService spotify)
    : IRequestHandler<UpdatePlaybackCommand, UpdatePlaybackCommandResponse>
{
    public async Task<UpdatePlaybackCommandResponse> Handle(UpdatePlaybackCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            if (request.Body.ContextUri is not null)
            {
                await spotify.UpdatePlayback(request.Body.ContextUri, request.Body.TrackUri);
            }
            else
            {
                await spotify.UpdatePlayback(request.Body.TrackUri!);
            }
        }
        catch (ApiException e)
        {
            // This status code is returned when content is not available.
            if (e.StatusCode == (int)HttpStatusCode.BadGateway)
            {
                return new UpdatePlaybackCommandResponse(IsAvailable: false);
            }

            throw;
        }

        await HandleShuffleFlag(request);

        return new UpdatePlaybackCommandResponse(IsAvailable: true);
    }

    private async Task HandleShuffleFlag(UpdatePlaybackCommand request)
    {
        if (request.Body is { WithImprovedShuffle: true, ContextUri: not null })
        {
            var playbackState = await spotify.GetPlaybackState();
            if (playbackState?.IsShuffled ?? false)
            {
                await spotify.ShufflePlayback(state: true);
            }
        }
    }
}
