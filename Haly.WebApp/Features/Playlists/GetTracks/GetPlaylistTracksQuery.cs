using System.Text.RegularExpressions;
using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists.GetPlaylist;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public record GetPlaylistTracksQuery(string PlaylistId, int Limit, int Offset, string? SortOrder,
        string? SearchTerm)
    : IRequest<PaginatedTracksDto?>;

public class GetPlaylistTracksHandler(LibraryContext db, ITotalDurationService totalDurationService)
    : IRequestHandler<GetPlaylistTracksQuery, PaginatedTracksDto?>
{
    public async Task<PaginatedTracksDto?> Handle(GetPlaylistTracksQuery request,
        CancellationToken cancellationToken)
    {
        var playlistExists = await db.Playlists.AnyAsync(p => p.Id == request.PlaylistId, cancellationToken);
        if (!playlistExists) return null;

        var tracks = db.PlaylistTracks
            .Where(t => t.PlaylistId == request.PlaylistId)
            .OrderBy(request.SortOrder);

        if (request.SearchTerm is not null)
        {
            // We have to use a variable for this regex, the \m flag (match start of word) is not
            // supported in .NET so we get an error.
            var regexTerm = $"\\m{request.SearchTerm}";
            tracks = tracks.Where(t =>
                Regex.IsMatch(t.Name, regexTerm, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(t.Album.Name, regexTerm, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(t.QueryData.AllArtistNames, regexTerm, RegexOptions.IgnoreCase)
            );
        }

        var page = await tracks.ToPaginatedListAsync(request.Offset, request.Limit, cancellationToken);
        var totalDuration = await totalDurationService.FromQueryable(tracks);

        return new PaginatedTracksDto(page.Adapt<PaginatedList<PlaylistTrackDto>>(), totalDuration.Format());
    }
}
