using Haly.WebApp.Features.Pagination;

namespace Haly.WebApp.Features.Playlists;

public record PlaylistWithTracksDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? Description { get; init; }
    public string? ImageUrl { get; init; }
    public int LikesTotal { get; init; }
    public OwnerBriefDto Owner { get; init; }

    public bool IsPersonalized { get; init; }

    public PaginatedList<PlaylistTrackDto> Tracks { get; set; }
    public string TotalDuration { get; set; }
}
