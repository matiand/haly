using Haly.WebApp.Features.Artists;

namespace Haly.WebApp.Features.Jobs.GetNewReleasesJob;

public record NewReleasesJobDto
{
    public int Id { get; init; }
    public DateTime FinishedAt { get; init; }

    public IEnumerable<ReleaseItemDto> All { get; init; }
    public IEnumerable<ReleaseItemDto> Albums { get; init; }
    public IEnumerable<ReleaseItemDto> SinglesAndEps { get; init; }

}
