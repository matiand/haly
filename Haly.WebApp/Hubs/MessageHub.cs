using Microsoft.AspNetCore.SignalR;

namespace Haly.WebApp.Hubs;

public class MessageHub : Hub<IMessageHubClient>;
