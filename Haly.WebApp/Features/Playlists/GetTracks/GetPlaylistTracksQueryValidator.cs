using System.Text.RegularExpressions;
using FluentValidation;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public class GetPlaylistTracksQueryValidator : AbstractValidator<GetPlaylistTracksQuery>
{
    public GetPlaylistTracksQueryValidator()
    {
        RuleFor(x => x.Limit).InclusiveBetween(from: 1, to: 200);
        RuleFor(x => x.Offset).GreaterThanOrEqualTo(valueToCompare: 0);
        RuleFor(x => x.SortOrder).Must(BeValidSortOrder).When(x => !string.IsNullOrWhiteSpace(x.SortOrder));

        RuleFor(x => x.SearchTerm)
            .Must(BeValidRegex)
            .When(x => !string.IsNullOrWhiteSpace(x.SearchTerm))
            .WithMessage("SearchTerm must be a valid regular expression");
    }

    private bool BeValidSortOrder(string? sortOrder)
    {
        return Regex.IsMatch(sortOrder!,
            "title|title_desc|artist|artist_desc|album|album_desc|added_at|added_at_desc|duration|duration_desc");
    }

    private bool BeValidRegex(string? searchTerm)
    {
        try
        {
            // ReSharper disable once UnusedVariable
            var regex = new Regex(searchTerm!);
            return true;
        }
        catch (ArgumentException)
        {
            return false;
        }
    }
}
