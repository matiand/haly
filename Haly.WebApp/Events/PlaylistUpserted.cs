using MediatR;

namespace Haly.WebApp.Events;

public record PlaylistUpserted(string PlaylistId, string UserMarket) : INotification;
