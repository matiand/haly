using Haly.WebApp.Features.Users.GetUserPlaylists;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Search;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Artists.GetArtist;

public record GetArtistQuery(string Id, string UserMarket) : IRequest<ArtistDetailedDto>;

public class GetArtistHandler(ISpotifyService spotify) : IRequestHandler<GetArtistQuery, ArtistDetailedDto>
{
    private const string SpotifyUserId = "spotify";

    public async Task<ArtistDetailedDto> Handle(GetArtistQuery request, CancellationToken cancellationToken)
    {
        var artistTask = spotify.GetArtist(request.Id, request.UserMarket);
        var isFollowedTask = spotify.IsCurrentUserFollowingCreator(CreatorType.Artist, request.Id);

        var (artist, isFollowed) = (await artistTask, await isFollowedTask);
        var dto = artist.Adapt<ArtistDetailedDto>();

        dto.IsFollowed = isFollowed;
        dto.HighlightedPlaylist = await GetHighlightedPlaylist(artist.Name, request.UserMarket);

        return dto;
    }

    private async Task<PlaylistCardDto?> GetHighlightedPlaylist(string artistName, string userMarket)
    {
        var searchResult = await spotify.Search(artistName, SearchType.Playlist, userMarket);

        var playlistsWithPrettyCovers = searchResult.Playlists!
            .Where(p => p.ImageUrl is not null && !p.ImageUrl.Contains("//mosaic"))
            .ToList();

        var nonSpotifyPlaylist = playlistsWithPrettyCovers.FirstOrDefault(p => p.Owner.Id != SpotifyUserId);
        var spotifyPlaylist = playlistsWithPrettyCovers.FirstOrDefault(p => p.Owner.Id == SpotifyUserId);

        return nonSpotifyPlaylist?.Adapt<PlaylistCardDto>() ?? spotifyPlaylist?.Adapt<PlaylistCardDto>();
    }
}
