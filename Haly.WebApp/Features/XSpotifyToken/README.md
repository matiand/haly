# XSpotifyToken

Most of our endpoints have to call Spotify Web API and we need a valid access token to do it.

The client sends it to us by using the `X-Spotify-Token` header.

To avoid repeating code in controllers for passing the header to `SpotifyClient`, we use a middleware that finds and saves it in `SpotifyAccessToken` singleton.
This way `SpotifyClient` can inject the singleton and use it to build its internal _httpClient_.
