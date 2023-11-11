namespace Haly.WebApp.Features.CurrentUser.UpdateCurrentUser;

public record UpdateCurrentUserCommandResponse(bool Created, PrivateUserDto User);
