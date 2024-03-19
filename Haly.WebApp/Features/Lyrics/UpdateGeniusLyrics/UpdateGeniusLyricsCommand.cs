using Haly.WebApp.Data;
using Haly.WebApp.Features.Lyrics.FindLyrics;
using Haly.WebApp.ThirdPartyApis.Genius;
using Haly.WebApp.ThirdPartyApis.Genius.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Lyrics.UpdateGeniusLyrics;

public record UpdateGeniusLyricsCommand(string Id, GeniusQueryBody Query) : IRequest<LyricsDto?>;

public class UpdateGeniusLyricsCommandHandler(LibraryContext db, IGeniusApi genius)
    : IRequestHandler<UpdateGeniusLyricsCommand, LyricsDto?>
{
    public async Task<LyricsDto?> Handle(UpdateGeniusLyricsCommand request, CancellationToken cancellationToken)
    {
        var lyricsTask = db.LyricsSet.FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken);

        var searchQuery = $"{request.Query.TrackName} by {request.Query.ArtistName}";
        var searchResultTask = genius.Search(searchQuery, request.Query.GeniusToken);

        var (lyrics, searchResult) = (await lyricsTask, await searchResultTask);

        var lyricsUrl = FindLyricsUrl(searchResult, request.Query);

        if (lyrics is null)
        {
            var newLyrics = new Models.Lyrics(request.Id, lyricsUrl);

            db.LyricsSet.Add(newLyrics);
            await db.SaveChangesAsync(cancellationToken);

            return newLyrics.Adapt<LyricsDto>();
        }

        lyrics.GeniusUrl = lyricsUrl;
        await db.SaveChangesAsync(cancellationToken);

        return null;
    }

    private static string? FindLyricsUrl(ResponseDto<SearchResponseDto> searchResult, GeniusQueryBody query)
    {
        var result = searchResult.Response.Hits.FirstOrDefault(item =>
            string.Equals(item.Result.Title, query.TrackName, StringComparison.OrdinalIgnoreCase) &&
            string.Equals(item.Result.PrimaryArtist.Name, query.ArtistName, StringComparison.OrdinalIgnoreCase));

        return result?.Result.Url;
    }
}
