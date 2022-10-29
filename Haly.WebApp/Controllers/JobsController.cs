using Haly.WebApp.Data;
using Haly.WebApp.Features.Jobs.RefetchPlaylistTracks;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Controllers;
// Don't show a warning about not awaiting Task.Run, because we want our job to run in background
#pragma warning disable CS4014

[Route("/Users/{userId}/[controller]")]
public class JobsController : ApiControllerBase
{
    private readonly LibraryContext _db;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public JobsController(LibraryContext db, IServiceScopeFactory serviceScopeFactory)
    {
        _db = db;
        _serviceScopeFactory = serviceScopeFactory;
    }

    [HttpPost("refetch-playlist-tracks")]
    [CallsSpotifyApi(SpotifyScopes.PlaylistReadPrivate)]
    public async Task<ActionResult> Get(string userId)
    {
        if (!await UserExists(userId)) return NotFound();

        Task.Run(async () =>
        {
            try
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

                return await mediator.Send(new RefetchPlaylistTracksCommand(userId));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        });

        return Accepted();
    }

    // Normally we would check for user in our command handler and return null, but
    // because it's a background job and we can't wait for its completion, we have
    // to do it here in our controller
    private Task<bool> UserExists(string userId) => _db.Users.AnyAsync(u => u.Id == userId);
}
