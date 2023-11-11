using Haly.WebApp.Data;
using Haly.WebApp.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.CurrentUser.UpdateCurrentUser;

public record UpdateCurrentUserCommand(PrivateUser User) : IRequest<UpdateCurrentUserCommandResponse>;

public class UpdateCurrentUserHandler : IRequestHandler<UpdateCurrentUserCommand, UpdateCurrentUserCommandResponse?>
{
    private readonly LibraryContext _db;

    public UpdateCurrentUserHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<UpdateCurrentUserCommandResponse?> Handle(UpdateCurrentUserCommand request,
        CancellationToken cancellationToken)
    {
        var freshUser = request.User;
        var cachedUser = await _db.Users.FirstOrDefaultAsync(u => u.Id == request.User.Id, cancellationToken);

        if (cachedUser is null)
        {
            _db.Users.Add(freshUser);
            await _db.SaveChangesAsync(cancellationToken);
            return new UpdateCurrentUserCommandResponse(Created: true, freshUser.Adapt<PrivateUserDto>());
        }

        cachedUser.Name = freshUser.Name;
        cachedUser.Market = freshUser.Market;
        cachedUser.Plan = freshUser.Plan;
        cachedUser.ImageUrl = freshUser.ImageUrl;
        await _db.SaveChangesAsync(cancellationToken);

        return new UpdateCurrentUserCommandResponse(Created: false, cachedUser.Adapt<PrivateUserDto>());
    }
}
