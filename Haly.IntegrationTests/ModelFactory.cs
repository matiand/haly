using Bogus;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.IntegrationTests;

public static class ModelFactory
{
    public static Faker<PrivateUser> Me => new Faker<PrivateUser>()
        .RuleFor(u => u.Id, f => f.Random.AlphaNumeric(length: 12))
        .RuleFor(u => u.Name, f => f.Internet.UserName())
        .RuleFor(u => u.Market, f => f.Address.CountryCode())
        .RuleFor(u => u.Plan, _ => Plan.Premium);

    public static Faker<PublicUser> PublicUser => new Faker<PublicUser>()
        .RuleFor(u => u.Id, f => f.Random.AlphaNumeric(length: 12))
        .RuleFor(u => u.Name, f => f.Internet.UserName())
        .RuleFor(u => u.FollowersTotal, f => f.Random.Int(min: 0, max: 1000));

    public static Faker<Playlist> Playlist => new Faker<Playlist>()
        .RuleFor(p => p.Id, f => f.Random.Guid().ToString())
        .RuleFor(p => p.Name, f => f.Commerce.ProductName())
        .RuleFor(p => p.Description, f => f.Commerce.ProductDescription())
        .RuleFor(p => p.SnapshotId, f => f.Random.AlphaNumeric(length: 12))
        .RuleFor(p => p.Owner, _ => Me.Generate().Adapt<Owner>())
        .RuleFor(p => p.LikesTotal, f => f.Random.Int(min: 0, max: 1000));

    public static Faker<Playlist> SpotifyPlaylist =>
        Playlist.RuleFor(p => p.Owner, _ => new Owner() { Id = "spotify", Name = "Spotify" });
}
