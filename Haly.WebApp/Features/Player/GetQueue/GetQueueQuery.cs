using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Player.GetQueue;

public record GetQueueQuery : IRequest<IEnumerable<TrackDto>>;

public class GetQueueQueryHandler : IRequestHandler<GetQueueQuery, IEnumerable<TrackDto>>
{
    private readonly ISpotifyService _spotify;

    public GetQueueQueryHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<IEnumerable<TrackDto>> Handle(GetQueueQuery request, CancellationToken cancellationToken)
    {
        var items = await _spotify.GetQueue();

        return items.Adapt<IEnumerable<TrackDto>>();
    }
}
