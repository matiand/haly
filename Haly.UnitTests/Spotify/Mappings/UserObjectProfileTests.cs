using AutoFixture;
using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify.Mappings;
using Mapster;

namespace Haly.UnitTests.Spotify.Mappings;

public class UserObjectProfileTests
{
    private TypeAdapterConfig Config { get; } = new();
    private Fixture Fixture { get; } = new();

    public UserObjectProfileTests()
    {
        var profile = new UserObjectProfile();
        profile.Register(Config);
    }

    [Theory]
    [InlineData("free", Plan.Free)]
    [InlineData("test", Plan.Free)]
    [InlineData("premium", Plan.Premium)]
    public void PrivateUser_Plan_IsMapped_AccordingToProductProperty(string product, Plan expected)
    {
        var src = Fixture.Build<PrivateUserObject>().Create();
        src.Product = product;

        var dest = src.Adapt<PrivateUser>(Config);

        dest.Plan.Should().Be(expected);
    }
}
