using FluentValidation;

namespace Haly.WebApp.Features.Player.SetRepeatModeCommand;

public class SetRepeatModeCommandValidator : AbstractValidator<SetRepeatModeCommand>
{
    public SetRepeatModeCommandValidator()
    {
        RuleFor(command => command.RepeatMode)
            .Must(BeValidRepeatMode)
            .WithMessage("RepeatMode must be one of: 'off', 'context', 'track'");
    }

    private bool BeValidRepeatMode(string mode)
    {
        return mode == "off" || mode == "context" || mode == "track";
    }
}
