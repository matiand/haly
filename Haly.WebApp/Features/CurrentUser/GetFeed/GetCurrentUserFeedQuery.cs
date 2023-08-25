using Haly.WebApp.Features.Artists;
using Haly.WebApp.Features.Users.GetUserPlaylists;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Search;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetFeed;

public record GetCurrentUserFeedQuery(string UserMarket) : IRequest<UserFeedDto>;

public class GetCurrentUserFeedQueryHandler : IRequestHandler<GetCurrentUserFeedQuery, UserFeedDto>
{
    private readonly ISpotifyService _spotify;
    private readonly Random _random = new();

    public GetCurrentUserFeedQueryHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<UserFeedDto> Handle(GetCurrentUserFeedQuery request, CancellationToken cancellationToken)
    {
        var feedPlaylistsTask = GetFeedPlaylists(request);
        var categoriesBasedOnTopArtistsTask = AddCategoriesBasedOnTopArtists(request);

        var dto = new UserFeedDto
        {
            Playlists = await feedPlaylistsTask,
            AlbumsByCategory = await categoriesBasedOnTopArtistsTask,
        };

        return dto;
    }

    private async Task<IEnumerable<PlaylistCardDto>> GetFeedPlaylists(GetCurrentUserFeedQuery request)
    {
        var dailyMixResults = await _spotify.Search("daily mix", SearchType.Playlist, request.UserMarket);
        var dailyMixes = dailyMixResults.Playlists
            .Where(p => p.Name.StartsWith("Daily Mix", StringComparison.InvariantCulture) &&
                        p.Owner.Id == "spotify")
            .OrderBy(p => p.Name);

        return dailyMixes.Adapt<IEnumerable<PlaylistCardDto>>();
    }

    private async Task<Dictionary<string, IEnumerable<ReleaseItemDto>>> AddCategoriesBasedOnTopArtists(
        GetCurrentUserFeedQuery request)
    {
        var topArtists = await _spotify.GetCurrentUserTopArtists();

        var seeds = topArtists.OrderBy(_ => _random.Next()).Take(count: 4).ToList();
        var recommendationTasks = seeds.Select(artist =>
                _spotify.GetRecommendations(request.UserMarket, trackIds: null, artistIds: artist.Id))
            .ToList();

        var dict = new Dictionary<string, IEnumerable<ReleaseItemDto>>();
        for (var i = 0; i < seeds.Count; i++)
        {
            var recommendations = await recommendationTasks[i];
            // We lie to the user that one of the recommendations is 'Album Picks' and not based on their top artists.
            var categoryName = i == 1 ? "Album Picks" : $"More like {seeds[i].Name}";
            var artistId = seeds[i].Id;

            dict.Add(categoryName, recommendations
                .Where(t => t.Artists.First().Id != artistId && t.Album.Type == AlbumType.Album)
                .DistinctBy(t => t.Album.Id)
                .Select(t => t.Album)
                .Take(count: 10)
                .Adapt<IEnumerable<ReleaseItemDto>>());
        }

        return dict;
    }
}
