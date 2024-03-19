using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Player.GetQueue;

public record GetQueueQuery : IRequest<IEnumerable<TrackDto>>;

public class GetQueueQueryHandler(ISpotifyService spotify) : IRequestHandler<GetQueueQuery, IEnumerable<TrackDto>>
{
    public async Task<IEnumerable<TrackDto>> Handle(GetQueueQuery request, CancellationToken cancellationToken)
    {
        var items = await spotify.GetQueue();

        return items.Adapt<IEnumerable<TrackDto>>();
    }
}
