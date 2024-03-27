using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.Search.FindTrack;
using Haly.WebApp.Features.Search.SearchSpotify;
using Haly.WebApp.Models.Search;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

public class SearchController : ApiControllerBase
{
    [HttpGet("playback")]
    [SwaggerOperation(Summary = "Find track in our cache",
        Description = "Find a track in our cache using playback data")]
    [SwaggerResponse(statusCode: 200, "Track search result", typeof(FindTrackQueryResponse))]
    public async Task<FindTrackQueryResponse> SearchCacheUsingPlaybackData(
        [SwaggerParameter("The id of the playlist that you want to search.")]
        string playlistId,
        [SwaggerParameter("Current playback id of the track you want to find.")] string trackPlaybackId)
    {
        var request = new FindTrackQuery(playlistId, trackPlaybackId);
        var response = await Mediator.Send(request);

        return response;
    }

    [HttpGet("spotify")]
    [SwaggerOperation(Summary = "Search Spotify API")]
    [SwaggerResponse(statusCode: 200, "Search results", typeof(SpotifySearchResultsDto))]
    [CallsSpotifyApi]
    public async Task<SpotifySearchResultsDto> SearchSpotify(string query, SearchType queryType,
        CurrentUserStore currentUserStore)
    {
        var request = new SearchSpotifyQuery(query, queryType, currentUserStore.User!.Market);
        var response = await Mediator.Send(request);

        return response;
    }
}
