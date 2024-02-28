using System.ComponentModel.DataAnnotations.Schema;
using Haly.WebApp.Models.Cards;

namespace Haly.WebApp.Models.Jobs;

public class CollectNewReleasesJob : Job
{
    public string UserId { get; set; }
    public DateTime? FinishedAt { get; set; }

    [Column(TypeName = "jsonb")]
    public List<ReleaseItem> NewReleases { get; set; }

    public PrivateUser User { get; set; }
}
