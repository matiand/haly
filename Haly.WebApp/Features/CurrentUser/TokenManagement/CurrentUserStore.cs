namespace Haly.WebApp.Features.CurrentUser.TokenManagement;

public class CurrentUserStore
{
    public UserDto? User { get; private set; }
    public string? Token { get; private set; }

    public bool IsEmpty => User is null || string.IsNullOrEmpty(Token);

    public void Update(string token, UserDto userDto)
    {
        Token = token;
        User = userDto;
    }
}
