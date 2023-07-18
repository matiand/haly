using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.Artists.GetArtist;

public class HighlightedPlaylistDtoProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Playlist, HighlightedPlaylistDto>()
            .Map(dest => dest.ImageUrl, src => src.Metadata.ImageUrl)
            .Map(dest => dest.OwnerName, src => src.Metadata.Owner.Name);
    }
}
