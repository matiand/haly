using Haly.WebApp.Features.Artists.GetArtist;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class ArtistsController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get artist", Description = "Fetch artist from Spotify")]
    [SwaggerResponse(statusCode: 200, "An artist", typeof(ArtistDetailedDto))]
    [CallsSpotifyApi()]
    public async Task<ArtistDetailedDto> GetArtist(string id, [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;
        var response = await Mediator.Send(new GetArtistQuery(id, currentUser.Market));

        return response;
    }

}
