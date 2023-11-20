using System.Collections.Generic;

// ReSharper disable once CheckNamespace
namespace Haly.GeneratedClients
{
    // Class used for request body in RemoveTracksPlaylist endpoint.
    public partial class Tracks2
    {
        // Specifies the positions of the track in the playlist.
        [Newtonsoft.Json.JsonProperty("positions", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public IEnumerable<int> Positions { get; set; }
    }
}
