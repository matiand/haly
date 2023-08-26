using System.Text.RegularExpressions;
using FluentValidation;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public class GetPlaylistQueryValidator : AbstractValidator<GetPlaylistQuery>
{
    public GetPlaylistQueryValidator()
    {
        RuleFor(x => x.SortOrder).Must(BeValidSortOrder).When(x => !string.IsNullOrWhiteSpace(x.SortOrder));
    }

    private bool BeValidSortOrder(string? sortOrder)
    {
        return Regex.IsMatch(sortOrder!,
            "title|title_desc|artist|artist_desc|album|album_desc|added_at|added_at_desc|duration|duration_desc");
    }
}
