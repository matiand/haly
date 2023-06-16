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
import type { AlbumDto } from './AlbumDto';
import {
    AlbumDtoFromJSON,
    AlbumDtoFromJSONTyped,
    AlbumDtoToJSON,
} from './AlbumDto';
import type { ArtistDto } from './ArtistDto';
import {
    ArtistDtoFromJSON,
    ArtistDtoFromJSONTyped,
    ArtistDtoToJSON,
} from './ArtistDto';
import type { TrackType } from './TrackType';
import {
    TrackTypeFromJSON,
    TrackTypeFromJSONTyped,
    TrackTypeToJSON,
} from './TrackType';

/**
 * 
 * @export
 * @interface TrackDto
 */
export interface TrackDto {
    /**
     * 
     * @type {number}
     * @memberof TrackDto
     */
    positionInPlaylist: number;
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
     * @type {Date}
     * @memberof TrackDto
     */
    addedAt: Date;
    /**
     * 
     * @type {TrackType}
     * @memberof TrackDto
     */
    type: TrackType;
    /**
     * 
     * @type {AlbumDto}
     * @memberof TrackDto
     */
    album: AlbumDto;
    /**
     * 
     * @type {Array<ArtistDto>}
     * @memberof TrackDto
     */
    artists: Array<ArtistDto>;
}

/**
 * Check if a given object implements the TrackDto interface.
 */
export function instanceOfTrackDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "positionInPlaylist" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "duration" in value;
    isInstance = isInstance && "addedAt" in value;
    isInstance = isInstance && "type" in value;
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
        
        'positionInPlaylist': json['positionInPlaylist'],
        'name': json['name'],
        'duration': json['duration'],
        'addedAt': (new Date(json['addedAt'])),
        'type': TrackTypeFromJSON(json['type']),
        'album': AlbumDtoFromJSON(json['album']),
        'artists': ((json['artists'] as Array<any>).map(ArtistDtoFromJSON)),
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
        
        'positionInPlaylist': value.positionInPlaylist,
        'name': value.name,
        'duration': value.duration,
        'addedAt': (value.addedAt.toISOString()),
        'type': TrackTypeToJSON(value.type),
        'album': AlbumDtoToJSON(value.album),
        'artists': ((value.artists as Array<any>).map(ArtistDtoToJSON)),
    };
}

