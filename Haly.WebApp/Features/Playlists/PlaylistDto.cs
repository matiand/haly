using Haly.WebApp.Features.Pagination;

namespace Haly.WebApp.Features.Playlists;

public record GetPlaylistResponse
{
    public string Id { get; init; }
    public string Name { get; init; }
    public PaginatedList<TrackDto> Tracks { get; set; }
}
