using Haly.WebApp.Models.Search;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Artists.GetArtist;

public record GetArtistQuery(string Id, string UserMarket) : IRequest<ArtistDetailedDto>;

public class GetArtistHandler : IRequestHandler<GetArtistQuery, ArtistDetailedDto>
{
    private readonly ISpotifyService _spotify;
    private const string SpotifyUserId = "spotify";

    public GetArtistHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<ArtistDetailedDto> Handle(GetArtistQuery request, CancellationToken cancellationToken)
    {
        var artist = await _spotify.GetArtist(request.Id, request.UserMarket);
        var dto = artist.Adapt<ArtistDetailedDto>();

        dto.HighlightedPlaylist = await GetHighlightedPlaylist(artist.Name, request.UserMarket);

        return dto;
    }

    private async Task<HighlightedPlaylistDto?> GetHighlightedPlaylist(string artistName, string userMarket)
    {
        var searchResult = await _spotify.Search(artistName, SearchType.Playlist, userMarket);

        var playlistsWithPrettyCovers = searchResult.Playlists
            .Where(p => p.Metadata.ImageUrl is not null && !p.Metadata.ImageUrl.Contains("//mosaic"))
            .ToList();

        var nonSpotifyPlaylist = playlistsWithPrettyCovers.FirstOrDefault(p => p.Metadata.Owner.Id != SpotifyUserId);
        var spotifyPlaylist = playlistsWithPrettyCovers.FirstOrDefault(p => p.Metadata.Owner.Id == SpotifyUserId);

        return nonSpotifyPlaylist?.Adapt<HighlightedPlaylistDto>() ?? spotifyPlaylist?.Adapt<HighlightedPlaylistDto>();
    }
}
