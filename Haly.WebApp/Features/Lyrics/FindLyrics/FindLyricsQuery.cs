using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Lyrics.FindLyrics;

public record FindLyricsQuery(string Id) : IRequest<LyricsDto?>;

public class FindGeniusLyricsQueryHandler : IRequestHandler<FindLyricsQuery, LyricsDto?>
{
    private readonly LibraryContext _db;

    public FindGeniusLyricsQueryHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<LyricsDto?> Handle(FindLyricsQuery request, CancellationToken cancellationToken)
    {
        var lyrics = await _db.LyricsSet
            .FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken);

        return lyrics?.Adapt<LyricsDto>();
    }
}
