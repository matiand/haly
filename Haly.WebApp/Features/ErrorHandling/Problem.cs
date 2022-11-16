namespace Haly.WebApp.Features.ErrorHandling;

// Class for returning errors to our Web API, that mimics ProblemDetails class
// Bad our fields are non-nullable, which gives our client strongly typed responses
public record Problem
{
    public string Type { get; init; }
    public int Status { get; init; }
    public string Title { get; init; }
}
