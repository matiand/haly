using Haly.WebApp.Models.Search;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Search.SearchSpotify;

public record SearchSpotifyQuery(string Query, SearchType QueryType, string UserMarket)
    : IRequest<SpotifySearchResultsDto>;

public class SearchSpotifyQueryHandler(ISpotifyService spotify)
    : IRequestHandler<SearchSpotifyQuery, SpotifySearchResultsDto>
{
    public async Task<SpotifySearchResultsDto> Handle(SearchSpotifyQuery request, CancellationToken cancellationToken)
    {
        var results = await spotify.Search(request.Query, request.QueryType, request.UserMarket);

        return results.Adapt<SpotifySearchResultsDto>();
    }
}
