namespace Haly.WebApp.Features.ErrorHandling;

// Class for returning errors to our Web API, that mimics ProblemDetails class.
// Our fields are non-nullable, which gets us better types.
public record Problem
{
    public string Type { get; init; }
    public int Status { get; init; }
    public string Title { get; init; }
}
