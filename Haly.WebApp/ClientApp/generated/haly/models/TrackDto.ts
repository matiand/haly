/* tslint:disable */
/* eslint-disable */
/**
 * Haly API
 * An ASP.NET Core Web API that adds quality of life improvements to Spotify and helps with music exploration
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ArtistBriefDto } from './ArtistBriefDto';
import {
    ArtistBriefDtoFromJSON,
    ArtistBriefDtoFromJSONTyped,
    ArtistBriefDtoToJSON,
} from './ArtistBriefDto';
import type { PlaylistTrackDtoAlbum } from './PlaylistTrackDtoAlbum';
import {
    PlaylistTrackDtoAlbumFromJSON,
    PlaylistTrackDtoAlbumFromJSONTyped,
    PlaylistTrackDtoAlbumToJSON,
} from './PlaylistTrackDtoAlbum';

/**
 * 
 * @export
 * @interface TrackDto
 */
export interface TrackDto {
    /**
     * 
     * @type {string}
     * @memberof TrackDto
     */
    spotifyId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TrackDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof TrackDto
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof TrackDto
     */
    uri?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof TrackDto
     */
    isPlayable: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof TrackDto
     */
    isExplicit: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof TrackDto
     */
    isSong: boolean;
    /**
     * 
     * @type {PlaylistTrackDtoAlbum}
     * @memberof TrackDto
     */
    album: PlaylistTrackDtoAlbum;
    /**
     * 
     * @type {Array<ArtistBriefDto>}
     * @memberof TrackDto
     */
    artists: Array<ArtistBriefDto>;
}

/**
 * Check if a given object implements the TrackDto interface.
 */
export function instanceOfTrackDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "duration" in value;
    isInstance = isInstance && "isPlayable" in value;
    isInstance = isInstance && "isExplicit" in value;
    isInstance = isInstance && "isSong" in value;
    isInstance = isInstance && "album" in value;
    isInstance = isInstance && "artists" in value;

    return isInstance;
}

export function TrackDtoFromJSON(json: any): TrackDto {
    return TrackDtoFromJSONTyped(json, false);
}

export function TrackDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'spotifyId': !exists(json, 'spotifyId') ? undefined : json['spotifyId'],
        'name': json['name'],
        'duration': json['duration'],
        'uri': !exists(json, 'uri') ? undefined : json['uri'],
        'isPlayable': json['isPlayable'],
        'isExplicit': json['isExplicit'],
        'isSong': json['isSong'],
        'album': PlaylistTrackDtoAlbumFromJSON(json['album']),
        'artists': ((json['artists'] as Array<any>).map(ArtistBriefDtoFromJSON)),
    };
}

export function TrackDtoToJSON(value?: TrackDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'spotifyId': value.spotifyId,
        'name': value.name,
        'duration': value.duration,
        'uri': value.uri,
        'isPlayable': value.isPlayable,
        'isExplicit': value.isExplicit,
        'isSong': value.isSong,
        'album': PlaylistTrackDtoAlbumToJSON(value.album),
        'artists': ((value.artists as Array<any>).map(ArtistBriefDtoToJSON)),
    };
}

