using Haly.WebApp.Features.Artists.GetAppearances;
using Haly.WebApp.Features.Artists.GetArtist;
using Haly.WebApp.Features.Artists.GetDiscography;
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

    [HttpGet("{id}/discography")]
    [SwaggerOperation(Summary = "Get artist's discography",
        Description = "Fetch releases created by the artist from Spotify")]
    [SwaggerResponse(statusCode: 200, "A list of releases that belong to the artist", typeof(ArtistDiscographyDto))]
    [CallsSpotifyApi()]
    public async Task<ArtistDiscographyDto> GetArtistDiscography(string id, [FromServices] CurrentUserStore meStore)
    {
        var currentUser = meStore.User!;
        var response = await Mediator.Send(new GetArtistDiscographyQuery(id, currentUser.Market));

        return response;
    }

    [HttpGet("{id}/appearances")]
    [SwaggerOperation(Summary = "Get artist's appearances",
        Description = "Fetch releases that the artist appears on from Spotify")]
    [SwaggerResponse(statusCode: 200, "A list of releases the artist appears on", typeof(ArtistAppearancesDto))]
    [CallsSpotifyApi()]
    public async Task<ArtistAppearancesDto> GetArtistAppearances(string id, [FromServices] CurrentUserStore meStore)
    {
        var currentUser = meStore.User!;
        var response = await Mediator.Send(new GetArtistAppearancesQuery(id, currentUser.Market));

        return response;
    }
}
