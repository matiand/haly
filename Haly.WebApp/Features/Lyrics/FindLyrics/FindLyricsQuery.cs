using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Lyrics.FindLyrics;

public record FindLyricsQuery(string Id) : IRequest<LyricsDto?>;

public class FindGeniusLyricsQueryHandler(LibraryContext db) : IRequestHandler<FindLyricsQuery, LyricsDto?>
{
    public async Task<LyricsDto?> Handle(FindLyricsQuery request, CancellationToken cancellationToken)
    {
        var lyrics = await db.LyricsSet
            .FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken);

        return lyrics?.Adapt<LyricsDto>();
    }
}
