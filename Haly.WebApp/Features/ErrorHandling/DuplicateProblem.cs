namespace Haly.WebApp.Features.ErrorHandling;

public record DuplicateProblem : Problem
{
    public bool AllDuplicates { get; init; }
    public bool SomeDuplicates { get; init; }
}
