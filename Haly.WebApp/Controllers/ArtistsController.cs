using Haly.WebApp.Features.Artists.GetArtist;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class ArtistsController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get artist", Description = "Fetch artist from Spotify")]
    [SwaggerResponse(statusCode: 200, "An artist", typeof(ArtistDetailsDto))]
    [CallsSpotifyApi()]
    public async Task<ArtistDetailsDto> GetArtist(string id)
    {
        var response = await Mediator.Send(new GetArtistQuery(id));

        return response;
    }

}
