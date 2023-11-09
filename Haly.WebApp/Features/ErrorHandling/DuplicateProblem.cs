using Haly.WebApp.Features.Playlists.AddTracks;

namespace Haly.WebApp.Features.ErrorHandling;

public record DuplicateProblem : Problem
{
    public string PlaylistId { get; init; }
    public DuplicateType DuplicateType { get; init; }
}
