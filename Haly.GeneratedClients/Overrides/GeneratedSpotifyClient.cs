using System;
using System.Net.Http;
using Newtonsoft.Json;

// ReSharper disable once CheckNamespace
namespace Haly.GeneratedClients
{
    public partial class GeneratedSpotifyClient
    {
        public GeneratedSpotifyClient(HttpClient httpClient, bool throwDeserializationErrors)
        {
            _httpClient = httpClient;

            var settings = new JsonSerializerSettings();
            if (!throwDeserializationErrors)
            {
                settings.Error += (_, args) =>
                {
                    Console.WriteLine(
                        $"Failed Deserialization of type: {args.CurrentObject}; property: {args.ErrorContext.Member}");
                    Console.WriteLine($"{args.ErrorContext.Error.Message}\n");
                    args.ErrorContext.Handled = true;
                };
            }

            _settings = new Lazy<JsonSerializerSettings>(settings);
        }
    }
}
