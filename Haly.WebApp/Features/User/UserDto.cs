using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.Features.User;

public record UserDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string Market { get; init; }
    public bool CanPlayTracks { get; set; }
}

public class UserMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Models.User, UserDto>().Map(dest => dest.CanPlayTracks, src => src.Plan == Plan.Premium);
    }
}
