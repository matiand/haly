using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.Albums.GetAlbum;
using Haly.WebApp.Features.Albums.GetRecommendations;
using Haly.WebApp.Features.Artists;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

public class AlbumsController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get album", Description = "Fetch album from Spotify")]
    [SwaggerResponse(statusCode: 200, "An album", typeof(AlbumDetailedDto))]
    [CallsSpotifyApi()]
    public async Task<ActionResult<AlbumDetailedDto>> GetAlbum(string id, [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        var album = await Mediator.Send(new GetAlbumQuery(id, currentUser.Market));

        return album;
    }

    [HttpGet("{id}/recomendations")]
    [SwaggerOperation(Summary = "Get album recomendations", Description = "Find similar albums to this one")]
    [SwaggerResponse(statusCode: 200, "A list of albums", typeof(IEnumerable<ReleaseItemDto>))]
    [CallsSpotifyApi()]
    public async Task<IEnumerable<ReleaseItemDto>> GetAlbumRecomendations(string id, string trackIds,
        [FromServices] CurrentUserStore currentUserStore)
    {
        var userMarket = currentUserStore.User!.Market;
        var albums = await Mediator.Send(new GetAlbumRecommendationsQuery(id, userMarket, trackIds));

        return albums;
    }
}
