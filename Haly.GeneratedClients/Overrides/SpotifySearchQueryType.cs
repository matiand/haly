// ReSharper disable once CheckNamespace

namespace Haly.GeneratedClients
{
    // We need a custom enum for the search endpoint, because the generated client does not support the 'All' option.
    public enum SpotifySearchQueryType
    {
        [System.Runtime.Serialization.EnumMember(Value = "album")]
        Album = 0,

        [System.Runtime.Serialization.EnumMember(Value = "artist")]
        Artist = 1,

        [System.Runtime.Serialization.EnumMember(Value = "playlist")]
        Playlist = 2,

        [System.Runtime.Serialization.EnumMember(Value = "track")]
        Track = 3,

        [System.Runtime.Serialization.EnumMember(Value = "album,artist,playlist,track")]
        All = 4,

        // Not supported
        // [System.Runtime.Serialization.EnumMember(Value = @"show")]
        // Show = 4,
        //
        // [System.Runtime.Serialization.EnumMember(Value = @"episode")]
        // Episode = 5,
        //
        // [System.Runtime.Serialization.EnumMember(Value = @"audiobook")]
        // Audiobook = 6,
    }
}
