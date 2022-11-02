using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.UpdateCurrentUser;

public record UpdateCurrentUserResponse(bool Created, UserDto User);

public record UpdateCurrentUserCommand : IRequest<UpdateCurrentUserResponse>;

public class UpdateCurrentUserHandler : IRequestHandler<UpdateCurrentUserCommand, UpdateCurrentUserResponse>
{
    private readonly LibraryContext _db;
    private readonly ISpotifyService _spotify;

    public UpdateCurrentUserHandler(LibraryContext db, ISpotifyService spotify)
    {
        _db = db;
        _spotify = spotify;
    }

    public async Task<UpdateCurrentUserResponse> Handle(UpdateCurrentUserCommand request,
        CancellationToken cancellationToken)
    {
        var spotifyUser = await _spotify.GetCurrentUser();
        var cachedUser =
            await _db.Users.FirstOrDefaultAsync(u => u.Id == spotifyUser.Id, cancellationToken: cancellationToken);

        if (cachedUser is null)
        {
            _db.Users.Add(spotifyUser);
            await _db.SaveChangesAsync(cancellationToken);
            return new UpdateCurrentUserResponse(Created: true, spotifyUser.Adapt<UserDto>());
        }

        cachedUser.Name = spotifyUser.Name;
        cachedUser.Market = spotifyUser.Market;
        cachedUser.Plan = spotifyUser.Plan;
        await _db.SaveChangesAsync(cancellationToken);

        return new UpdateCurrentUserResponse(Created: false, cachedUser.Adapt<UserDto>());
    }
}
