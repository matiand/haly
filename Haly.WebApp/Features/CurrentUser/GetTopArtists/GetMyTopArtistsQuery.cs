using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetTopArtists;

public record GetMyTopArtistsQuery : IRequest<IEnumerable<TopArtistDto>>;

public class GetMyTopArtistsHandler : IRequestHandler<GetMyTopArtistsQuery, IEnumerable<TopArtistDto>>
{
    private readonly ISpotifyService _spotify;

    public GetMyTopArtistsHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<IEnumerable<TopArtistDto>> Handle(GetMyTopArtistsQuery request, CancellationToken cancellationToken)
    {
        var artists = await _spotify.GetCurrentUserTopArtists();

        return artists.Adapt<IEnumerable<TopArtistDto>>();
    }
}
