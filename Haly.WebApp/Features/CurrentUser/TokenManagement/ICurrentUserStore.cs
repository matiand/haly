using Haly.WebApp.Models;

namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

public interface ICurrentUserStore
{
    PrivateUserDto? User { get; }
    string? Token { get; }
    bool IsEmpty { get; }
    void Update(string token, PrivateUser user);
}
