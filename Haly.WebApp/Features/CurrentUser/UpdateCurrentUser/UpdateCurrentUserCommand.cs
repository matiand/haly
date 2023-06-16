using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateCurrentUser;

public record UpdateCurrentUserCommand(User User) : IRequest<UpdateCurrentUserResponse>;

public class UpdateCurrentUserHandler : IRequestHandler<UpdateCurrentUserCommand, UpdateCurrentUserResponse?>
{
    private readonly LibraryContext _db;

    public UpdateCurrentUserHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<UpdateCurrentUserResponse?> Handle(UpdateCurrentUserCommand request,
        CancellationToken cancellationToken)
    {
        var freshUser = request.User;
        var cachedUser = await _db.Users.FirstOrDefaultAsync(u => u.Id == request.User.Id, cancellationToken);

        if (cachedUser is null)
        {
            _db.Users.Add(freshUser);
            await _db.SaveChangesAsync(cancellationToken);
            return new UpdateCurrentUserResponse(Created: true, freshUser.Adapt<UserDto>());
        }

        cachedUser.Name = freshUser.Name;
        cachedUser.Market = freshUser.Market;
        cachedUser.Plan = freshUser.Plan;
        await _db.SaveChangesAsync(cancellationToken);

        return new UpdateCurrentUserResponse(Created: false, cachedUser.Adapt<UserDto>());
    }
}
