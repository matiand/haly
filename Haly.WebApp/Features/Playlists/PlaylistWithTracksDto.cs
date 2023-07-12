using Haly.WebApp.Features.Pagination;

namespace Haly.WebApp.Features.Playlists;

public record PlaylistWithTracksDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public PlaylistMetadataDto Metadata { get; init; }
    public PaginatedList<PlaylistTrackDto> Tracks { get; set; }
    public string TotalDuration { get; set; }
}
