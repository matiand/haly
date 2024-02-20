using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Cards;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class ArtistObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<ArtistObject, ArtistDetailed>()
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl());

        config.ForType<ArtistObject, ArtistCard>()
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl());
    }
}
