using System.Text.RegularExpressions;
using Haly.WebApp.Data;
using Haly.WebApp.Features.Pagination;
using Haly.WebApp.Features.Playlists.TotalDuration;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public record GetPlaylistTracksQuery(string PlaylistId, int Limit, int Offset, string? SortOrder,
        string? SearchTerm)
    : IRequest<PaginatedTracksDto?>;

public class GetPlaylistTracksHandler : IRequestHandler<GetPlaylistTracksQuery, PaginatedTracksDto?>
{
    private readonly LibraryContext _db;
    private readonly ITotalDurationService _totalDurationService;

    public GetPlaylistTracksHandler(LibraryContext db, ITotalDurationService totalDurationService)
    {
        _db = db;
        _totalDurationService = totalDurationService;
    }

    public async Task<PaginatedTracksDto?> Handle(GetPlaylistTracksQuery request,
        CancellationToken cancellationToken)
    {
        var playlist = await _db.Playlists.AnyAsync(p => p.Id == request.PlaylistId, cancellationToken);
        if (!playlist) return null;

        var tracks = _db.PlaylistTracks
            .Where(t => t.PlaylistId == request.PlaylistId);

        if (request.SearchTerm is not null)
        {
            // We have to use a variable for this regex, the \m flag (match start of word) is not
            // supported in .NET so we get an error.
            var regexTerm = $"\\m{request.SearchTerm}";
            tracks = tracks.Where(t =>
                Regex.IsMatch(t.Name, regexTerm, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(t.Album.Name, regexTerm, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(t.ArtistNames, regexTerm, RegexOptions.IgnoreCase)
            );
        }

        var sortedTracks = request.SortOrder switch
        {
            "title" => tracks.OrderBy(t => t.Name),
            "title_desc" => tracks.OrderByDescending(t => t.Name),
            "artist" => tracks.OrderBy(t => t.Artists.First().Name),
            "artist_desc" => tracks.OrderByDescending(t => t.Artists.First().Name),
            "album" => tracks.OrderBy(t => t.Album.Name),
            "album_desc" => tracks.OrderByDescending(t => t.Album.Name),
            "added_at" => tracks.OrderBy(t => t.AddedAt).ThenBy(t => t.Album.Name),
            "added_at_desc" => tracks.OrderByDescending(t => t.AddedAt).ThenBy(t => t.Album.Name),
            "duration" => tracks.OrderByDescending(t => t.DurationInMs),
            "duration_desc" => tracks.OrderByDescending(t => t.DurationInMs),
            _ => tracks.OrderBy(t => t.PositionInPlaylist),
        };

        sortedTracks = sortedTracks.ThenBy(t => t.AlbumPosition);

        var page = await sortedTracks.ToPaginatedListAsync(request.Offset, request.Limit, cancellationToken);
        var totalDuration = await _totalDurationService.FromQueryable(sortedTracks);

        return new PaginatedTracksDto(page.Adapt<PaginatedList<PlaylistTrackDto>>(), totalDuration.Format());
    }
}
