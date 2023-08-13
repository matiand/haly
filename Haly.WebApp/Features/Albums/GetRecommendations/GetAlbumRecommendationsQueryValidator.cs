using FluentValidation;

namespace Haly.WebApp.Features.Albums.GetRecommendations;

public class GetAlbumRecommendationsQueryValidator : AbstractValidator<GetAlbumRecommendationsQuery>
{
    public GetAlbumRecommendationsQueryValidator()
    {
        RuleFor(x => x.TrackIds)
            .NotEmpty()
            .WithMessage("TrackIds must be provided.");

        RuleFor(x => x.TrackIds)
            .Must(t => t.Count(c => c == ',') < 5)
            .When(x => string.IsNullOrEmpty(x.TrackIds))
            .WithMessage("Up to 5 track ids can be provided.");
    }
}
