using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.User.GetUser;

public record GetUserQuery(string Id) : IRequest<UserDto?>;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserDto?>
{
    private readonly LibraryContext _db;

    public GetUserQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public Task<UserDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        return _db.Users.Where(user => user.Id == request.Id).ProjectToType<UserDto>()
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);
    }
}
