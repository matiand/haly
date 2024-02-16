using System.Text.Json.Serialization;

namespace Haly.WebApp.ThirdPartyApis.Genius.Dtos;

public record ResultItemDto
{
    public string Title { get; init; }
    public string Url { get; init; }

    [JsonPropertyName("primary_artist")]
    public PrimaryArtistDto PrimaryArtist { get; init; }
}
