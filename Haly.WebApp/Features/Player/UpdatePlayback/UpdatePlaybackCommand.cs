using System.Net;
using Haly.GeneratedClients;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

// todo: explain all the combinations in swagger (only context, context + track, only track)
public record UpdatePlaybackCommand(string? ContextUri, string? TrackUri, bool WithImprovedShuffle)
    : IRequest<UpdatePlaybackCommandResponse>;

public class UpdatePlaybackCommandHandler(ISpotifyPlaybackService spotify)
    : IRequestHandler<UpdatePlaybackCommand, UpdatePlaybackCommandResponse>
{
    public async Task<UpdatePlaybackCommandResponse> Handle(UpdatePlaybackCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            if (request.ContextUri is not null)
            {
                await spotify.UpdatePlayback(request.ContextUri, request.TrackUri);
            }
            else
            {
                await spotify.UpdatePlayback(request.TrackUri!);
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
        if (request is { WithImprovedShuffle: true, ContextUri: not null })
        {
            var playbackState = await spotify.GetPlaybackState();
            if (playbackState?.IsShuffled ?? false)
            {
                await spotify.ShufflePlayback(state: true);
            }
        }
    }
}
