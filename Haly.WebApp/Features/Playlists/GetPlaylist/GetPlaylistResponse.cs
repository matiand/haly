using Haly.WebApp.Features.Pagination;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public record GetPlaylistResponse
{
    public string Id { get; init; }
    public string Name { get; init; }
    public PlaylistMetadataDto Metadata { get; set; }
    public PaginatedList<TrackDto> Tracks { get; set; }
}
