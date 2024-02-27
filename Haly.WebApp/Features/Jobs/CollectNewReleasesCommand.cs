using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Jobs;

public record CollectNewReleasesCommand(string UserId) : IRequest;

public class CollectNewReleasesHandler : IRequestHandler<CollectNewReleasesCommand>
{
    private readonly ISpotifyService _spotify;
    private readonly LibraryContext _db;

    public CollectNewReleasesHandler(ISpotifyService spotify, LibraryContext db)
    {
        _spotify = spotify;
        _db = db;
    }

    public Task Handle(CollectNewReleasesCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
