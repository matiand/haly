using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.Users.GetUserPlaylists;

public class PlaylistCardDtoProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Playlist, PlaylistCardDto>()
            .Map(dest => dest.ImageUrl, src => src.Metadata.ImageUrl);
    }
}
