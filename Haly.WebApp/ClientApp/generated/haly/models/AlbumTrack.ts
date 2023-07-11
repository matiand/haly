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
import type { ArtistBrief } from './ArtistBrief';
import {
    ArtistBriefFromJSON,
    ArtistBriefFromJSONTyped,
    ArtistBriefToJSON,
} from './ArtistBrief';

/**
 * 
 * @export
 * @interface AlbumTrack
 */
export interface AlbumTrack {
    /**
     * 
     * @type {string}
     * @memberof AlbumTrack
     */
    spotifyId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AlbumTrack
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof AlbumTrack
     */
    durationInMs: number;
    /**
     * 
     * @type {number}
     * @memberof AlbumTrack
     */
    discNumber: number;
    /**
     * 
     * @type {Array<ArtistBrief>}
     * @memberof AlbumTrack
     */
    artists: Array<ArtistBrief>;
    /**
     * 
     * @type {string}
     * @memberof AlbumTrack
     */
    readonly duration: string;
}

/**
 * Check if a given object implements the AlbumTrack interface.
 */
export function instanceOfAlbumTrack(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "durationInMs" in value;
    isInstance = isInstance && "discNumber" in value;
    isInstance = isInstance && "artists" in value;
    isInstance = isInstance && "duration" in value;

    return isInstance;
}

export function AlbumTrackFromJSON(json: any): AlbumTrack {
    return AlbumTrackFromJSONTyped(json, false);
}

export function AlbumTrackFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlbumTrack {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'spotifyId': !exists(json, 'spotifyId') ? undefined : json['spotifyId'],
        'name': json['name'],
        'durationInMs': json['durationInMs'],
        'discNumber': json['discNumber'],
        'artists': ((json['artists'] as Array<any>).map(ArtistBriefFromJSON)),
        'duration': json['duration'],
    };
}

export function AlbumTrackToJSON(value?: AlbumTrack | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'spotifyId': value.spotifyId,
        'name': value.name,
        'durationInMs': value.durationInMs,
        'discNumber': value.discNumber,
        'artists': ((value.artists as Array<any>).map(ArtistBriefToJSON)),
    };
}

