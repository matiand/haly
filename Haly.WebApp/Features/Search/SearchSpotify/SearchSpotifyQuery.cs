using Haly.WebApp.Models.Search;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Search.SearchSpotify;

public record SearchSpotifyQuery(string Query, SearchType QueryType, string UserMarket)
    : IRequest<SpotifySearchResultsDto>;

public class SearchSpotifyQueryHandler : IRequestHandler<SearchSpotifyQuery, SpotifySearchResultsDto>
{
    private readonly ISpotifyService _spotify;

    public SearchSpotifyQueryHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<SpotifySearchResultsDto> Handle(SearchSpotifyQuery request, CancellationToken cancellationToken)
    {
        var results = await _spotify.Search(request.Query, request.QueryType, request.UserMarket);

        return results.Adapt<SpotifySearchResultsDto>();
    }
}
