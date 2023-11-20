using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTracksCommand(string PlalistId, RemoveTracksRequestBody Body) : IRequest<Unit>;

public class RemoveTracksCommandHandler : IRequestHandler<RemoveTracksCommand, Unit>
{
    private readonly ISpotifyService _spotify;

    public RemoveTracksCommandHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<Unit> Handle(RemoveTracksCommand request, CancellationToken cancellationToken)
    {
        await _spotify.RemoveTracks(request.PlalistId, request.Body.Tracks);

        return Unit.Value;
    }
}
