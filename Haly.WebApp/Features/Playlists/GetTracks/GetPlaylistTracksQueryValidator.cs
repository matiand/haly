using FluentValidation;

namespace Haly.WebApp.Features.Playlists.GetTracks;

public class GetPlaylistTracksQueryValidator : AbstractValidator<GetPlaylistTracksQuery>
{
    public GetPlaylistTracksQueryValidator()
    {
        RuleFor(x => x.Limit).InclusiveBetween(from: 1, to: 200);
        RuleFor(x => x.Offset).GreaterThanOrEqualTo(valueToCompare: 0);
    }
}
