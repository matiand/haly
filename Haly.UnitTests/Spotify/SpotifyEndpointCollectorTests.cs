using FluentAssertions;
using Haly.GeneratedClients;
using Haly.WebApp.ThirdPartyApis.Spotify;
using NSubstitute;

namespace Haly.UnitTests.Spotify;

public class SpotifyEndpointCollectorTests
{
    [Theory]
    [InlineData(500, 50)]
    [InlineData(499, 50)]
    [InlineData(98, 100)]
    [InlineData(9, 50)]
    public async Task FetchConcurrently_CollectsSpecifiedData_WhenStartingOffsetIs0(int total, int limit)
    {
        // Arrange
        var endpointCollector = new SpotifyEndpointCollector();
        var endpointFnMock = Substitute.For<Func<int, int, Task<FakePagingObject>>>();

        var endpointTotal = total;
        var endpointLimit = limit;
        var endpointData = Enumerable.Range(start: 0, count: endpointTotal).ToList();
        var endpointPaginations = CreateEndpointPaginations(endpointTotal, endpointLimit, endpointData);

        var expectedCalls = endpointPaginations.Count;
        endpointFnMock(Arg.Any<int>(), Arg.Any<int>())
            .Returns(_ => Task.FromResult(endpointPaginations.Dequeue()));

        // Act
        var data = await endpointCollector.FetchConcurrently(
            endpointFn: endpointFnMock,
            dataFn: (data) => data.Items,
            endpointLimit: 50, maxConcurrentRequests: 2);

        // Assert
        data.Count.Should().Be(endpointTotal);
        data.Should().BeEquivalentTo(endpointData);
        await endpointFnMock.Received(expectedCalls).Invoke(Arg.Any<int>(), Arg.Any<int>());
    }

    [Theory]
    [InlineData(986, 50, 490)]
    [InlineData(500, 50, 450)]
    [InlineData(98, 50, 47)]
    public async Task FetchConcurrently_CollectsSpecifiedData_WhenStartingOffsetIsBiggerThan0(int total, int limit,
        int startingOffset)
    {
        // Arrange
        var endpointCollector = new SpotifyEndpointCollector();
        var endpointFnMock = Substitute.For<Func<int, int, Task<FakePagingObject>>>();

        var endpointTotal = total;
        var endpointLimit = limit;
        var endpointData = Enumerable.Range(start: 0, count: endpointTotal).ToList();
        var endpointPaginations = CreateEndpointPaginations(endpointTotal, endpointLimit, endpointData, startingOffset);

        var expectedCalls = endpointPaginations.Count;
        endpointFnMock(Arg.Any<int>(), Arg.Any<int>())
            .Returns(_ => Task.FromResult(endpointPaginations.Dequeue()));

        // Act
        var data = await endpointCollector.FetchConcurrently(
            endpointFn: endpointFnMock,
            dataFn: (data) => data.Items,
            endpointLimit: 50, maxConcurrentRequests: 4, startingOffset: startingOffset);

        // Assert
        data.Count.Should().Be(endpointTotal - startingOffset);
        data.Should().BeEquivalentTo(endpointData.Skip(startingOffset));
        await endpointFnMock.Received(expectedCalls).Invoke(Arg.Any<int>(), Arg.Any<int>());
    }

    // This has to be public, otherwise these tests fail.
    public class FakePagingObject : PagingObject
    {
        public List<int> Items { get; set; } = new();
    }

    private static Queue<FakePagingObject> CreateEndpointPaginations(int endpointTotal, int endpointLimit,
        List<int> endpointData, int startingOffset = 0)
    {
        var remaining = endpointTotal - startingOffset;
        var endpointDataQueue = new Queue<FakePagingObject>();
        while (remaining > 0)
        {
            var nextOffset = endpointTotal - remaining;
            endpointDataQueue.Enqueue(new FakePagingObject()
            {
                Offset = nextOffset,
                Limit = endpointLimit,
                Total = endpointTotal,
                Items = endpointData.Skip(nextOffset).Take(endpointLimit).ToList()
            });

            remaining -= endpointLimit;
        }

        return endpointDataQueue;
    }
}
