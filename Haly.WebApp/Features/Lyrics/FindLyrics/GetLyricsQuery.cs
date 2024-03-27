using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Lyrics.FindLyrics;

public record GetLyricsQuery(string Id) : IRequest<LyricsDto?>;

public class GetLyricsQueryHandler(LibraryContext db) : IRequestHandler<GetLyricsQuery, LyricsDto?>
{
    public async Task<LyricsDto?> Handle(GetLyricsQuery request, CancellationToken cancellationToken)
    {
        var lyrics = await db.LyricsSet
            .FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken);

        return lyrics?.Adapt<LyricsDto>();
    }
}
