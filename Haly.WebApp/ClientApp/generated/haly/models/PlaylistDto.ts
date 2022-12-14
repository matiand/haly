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
import type { TrackDto } from './TrackDto';
import {
    TrackDtoFromJSON,
    TrackDtoFromJSONTyped,
    TrackDtoToJSON,
} from './TrackDto';

/**
 * 
 * @export
 * @interface PlaylistDto
 */
export interface PlaylistDto {
    /**
     * 
     * @type {string}
     * @memberof PlaylistDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistDto
     */
    name: string;
    /**
     * 
     * @type {Array<TrackDto>}
     * @memberof PlaylistDto
     */
    tracks: Array<TrackDto>;
}

/**
 * Check if a given object implements the PlaylistDto interface.
 */
export function instanceOfPlaylistDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "tracks" in value;

    return isInstance;
}

export function PlaylistDtoFromJSON(json: any): PlaylistDto {
    return PlaylistDtoFromJSONTyped(json, false);
}

export function PlaylistDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaylistDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'tracks': ((json['tracks'] as Array<any>).map(TrackDtoFromJSON)),
    };
}

export function PlaylistDtoToJSON(value?: PlaylistDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'tracks': ((value.tracks as Array<any>).map(TrackDtoToJSON)),
    };
}

