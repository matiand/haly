using Haly.WebApp.Features.Albums.GetAlbum;
using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Controllers;

public class AlbumsController : ApiControllerBase
{
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get album", Description = "Fetch album from Spotify")]
    [SwaggerResponse(statusCode: 200, "An album", typeof(AlbumDetailed))]
    [CallsSpotifyApi()]
    public async Task<AlbumDetailed> GetAlbum(string id, [FromServices] CurrentUserStore currentUserStore)
    {
        var currentUser = currentUserStore.User!;

        var album = await Mediator.Send(new GetAlbumQuery(id, currentUser.Market));

        return album;
    }
}
