using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

public class CurrentUserStore
{
    public PrivateUserDto? User { get; private set; }
    public string? Token { get; private set; }

    public bool IsEmpty => User is null || string.IsNullOrEmpty(Token);

    public void Update(string token, PrivateUser user)
    {
        Token = token;
        User = user.Adapt<PrivateUserDto>();
    }
}
