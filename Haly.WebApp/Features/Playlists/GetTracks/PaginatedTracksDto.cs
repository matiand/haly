using Haly.WebApp.Features.Pagination;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public record PaginatedTracksDto(PaginatedList<PlaylistTrackDto> Page, string TotalDuration);
