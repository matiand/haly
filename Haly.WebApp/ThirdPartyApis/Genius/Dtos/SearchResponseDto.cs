namespace Haly.WebApp.ThirdPartyApis.Genius.Dtos;

public record SearchResponseDto
{
    public List<HitItemDto> Hits { get; init; }
}
