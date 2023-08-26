using Haly.WebApp.Models.Cards;

namespace Haly.WebApp.Models.Tracks;

public class RecommendedTrack : TrackBase
{
    public ReleaseItem Album { get; set; }
}
