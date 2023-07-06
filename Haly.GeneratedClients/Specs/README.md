# OpenAPI specification files

## Spotify

`spotify-open-api.yml` uses [sonallux/spotify-web-api](https://github.com/sonallux/spotify-web-api) repo.

Whenever a new spec version is published, carefully update it, so that our fixes are not removed.

### Changes

-   `ArtistObject`: set as _nullable_ **href**, **id**, **uri**
-   `ArtistObject`: add _show_ value to **type** enum
-   `SimplifiedArtistObject`: set as _nullable_ **href**, **id**, **uri**
-   `SimplifiedArtistObject`: add _show_ value to **type** enum
-   `SimplifiedTrackObject`: set as _nullable_ **available_markets**, **href**, **id**, **preview_url**, **uri**
-   `SimplifiedTrackObject`: add _episode_, _track_ values to **type** enum
-   `TrackObject`: set as _nullable_ **available_markets**, **href**, **id**, **preview_url**, **uri**
-   `TrackObject`: add _episode_ value to **type** enum
-   `AlbumBase`: remove **total_tracks**, **available_markets** from required list
-   `AlbumBase`: set as _nullable_ **album_type**, **available_markets**, **href**, **id**, **release_date**, **release_date_precision**, **uri**
-   `AlbumBase`: add _show_ value to **type** enum
-   `CursorPagingObject`: set as _nullable_ **next**
-   `CursorObject`: set as _nullable_ **after** and **before**
-   `unfollow-artists-users`: replace _200_ response with _204_
