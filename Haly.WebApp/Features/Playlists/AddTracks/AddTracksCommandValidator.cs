using FluentValidation;

namespace Haly.WebApp.Features.Playlists.AddTracks;

public class AddTracksCommandValidator : AbstractValidator<AddTracksCommand>
{
    public AddTracksCommandValidator()
    {
        RuleFor(x => x.PlaylistId).NotEmpty();
        RuleFor(x => x.UserMarket).NotEmpty();
        RuleFor(x => x.Body.DuplicatesStrategy).IsInEnum();

        RuleFor(command => command.Body.CollectionUri)
             .Must(uri => !string.IsNullOrWhiteSpace(uri))
             .When(command => command.Body.TrackUris is null || !command.Body.TrackUris.Any())
             .WithMessage("Either CollectionUri or TrackUris must be provided.");

        RuleFor(command => command.Body.TrackUris)
            .Must(uris => uris is not null && uris.All(uri => !string.IsNullOrWhiteSpace(uri)))
            .When(command => string.IsNullOrWhiteSpace(command.Body.CollectionUri))
            .WithMessage("Either CollectionUri or TrackUris must be provided.");
    }
}
