using System.Collections.Generic;
#pragma warning disable CS8981 // The type name only contains lower-cased ascii characters. Such names may become reserved for the language.

// ReSharper disable once CheckNamespace
namespace Haly.GeneratedClients
{
    // Class used for request body in RemoveTracksPlaylist endpoint.
    // ReSharper disable once InconsistentNaming
    public partial class tracks
    {
        // Specifies the positions of the track in the playlist.
        [Newtonsoft.Json.JsonProperty("positions", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public IEnumerable<int>? Positions { get; set; }
    }
}
