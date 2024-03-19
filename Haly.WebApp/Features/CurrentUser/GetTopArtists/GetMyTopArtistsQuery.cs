using Haly.WebApp.Features.Artists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetTopArtists;

public record GetMyTopArtistsQuery : IRequest<IEnumerable<ArtistCardDto>>;

public class GetMyTopArtistsHandler(ISpotifyService spotify)
    : IRequestHandler<GetMyTopArtistsQuery, IEnumerable<ArtistCardDto>>
{
    public async Task<IEnumerable<ArtistCardDto>> Handle(GetMyTopArtistsQuery request, CancellationToken cancellationToken)
    {
        var artists = await spotify.GetCurrentUserTopArtists();

        return artists.Adapt<IEnumerable<ArtistCardDto>>();
    }
}
