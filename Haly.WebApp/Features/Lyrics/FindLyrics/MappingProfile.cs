using Mapster;

namespace Haly.WebApp.Features.Lyrics.FindLyrics;

public class MappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Models.Lyrics, LyricsDto>()
            .Map(dest => dest.PlaybackId, src => src.Id);
    }
}
