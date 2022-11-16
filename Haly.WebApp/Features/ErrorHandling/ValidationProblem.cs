namespace Haly.WebApp.Features.ErrorHandling;

public record ValidationProblem : Problem
{
    public IEnumerable<string> Errors { get; init; }
}
