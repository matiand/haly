using System.Text.RegularExpressions;
using FluentValidation;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public class GetPlaylistTracksQueryValidator : AbstractValidator<GetPlaylistTracksQuery>
{
    public GetPlaylistTracksQueryValidator()
    {
        RuleFor(x => x.Limit).InclusiveBetween(from: 1, to: 200);
        RuleFor(x => x.Offset).GreaterThanOrEqualTo(valueToCompare: 0);

        RuleFor(x => x.SearchTerm)
            .Must(BeValidRegex)
            .When(x => !string.IsNullOrWhiteSpace(x.SearchTerm))
            .WithMessage("SearchTerm must be a valid regular expression");
    }

    private bool BeValidRegex(string? searchTerm)
    {
        try
        {
            // ReSharper disable once ReturnValueOfPureMethodIsNotUsed
            Regex.Match("", searchTerm!);
            return true;
        }
        catch (ArgumentException)
        {
            return false;
        }
    }
}
