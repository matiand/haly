using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.Artists.GetArtist;

public class MappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Playlist, HighlightedPlaylistDto>()
            .Map(dest => dest.OwnerName, src => src.Owner.Name);
    }
}
