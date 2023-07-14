using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class DeviceObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<DeviceObject, Device>()
            .Map(dest => dest.IsActive, src => src.Is_active)
            .Map(dest => dest.VolumePercent, src => src.Volume_percent);
    }
}
