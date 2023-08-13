using Haly.WebApp.Features.Users.GetUserPlaylists;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.CurrentUser.GetFeed;

public class MappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Playlist, PlaylistCardDto>()
            .Map(dest => dest.Description, src => src.Metadata.Description);
    }
}
