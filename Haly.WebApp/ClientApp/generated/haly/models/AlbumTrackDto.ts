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

/**
 * 
 * @export
 * @interface AlbumTrackDto
 */
export interface AlbumTrackDto {
    /**
     * 
     * @type {string}
     * @memberof AlbumTrackDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AlbumTrackDto
     */
    playbackId: string;
    /**
     * 
     * @type {string}
     * @memberof AlbumTrackDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof AlbumTrackDto
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof AlbumTrackDto
     */
    uri?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof AlbumTrackDto
     */
    isPlayable: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AlbumTrackDto
     */
    isExplicit: boolean;
    /**
     * 
     * @type {number}
     * @memberof AlbumTrackDto
     */
    discNumber: number;
    /**
     * 
     * @type {Array<ArtistBriefDto>}
     * @memberof AlbumTrackDto
     */
    artists: Array<ArtistBriefDto>;
}

/**
 * Check if a given object implements the AlbumTrackDto interface.
 */
export function instanceOfAlbumTrackDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "playbackId" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "duration" in value;
    isInstance = isInstance && "isPlayable" in value;
    isInstance = isInstance && "isExplicit" in value;
    isInstance = isInstance && "discNumber" in value;
    isInstance = isInstance && "artists" in value;

    return isInstance;
}

export function AlbumTrackDtoFromJSON(json: any): AlbumTrackDto {
    return AlbumTrackDtoFromJSONTyped(json, false);
}

export function AlbumTrackDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlbumTrackDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'playbackId': json['playbackId'],
        'name': json['name'],
        'duration': json['duration'],
        'uri': !exists(json, 'uri') ? undefined : json['uri'],
        'isPlayable': json['isPlayable'],
        'isExplicit': json['isExplicit'],
        'discNumber': json['discNumber'],
        'artists': ((json['artists'] as Array<any>).map(ArtistBriefDtoFromJSON)),
    };
}

export function AlbumTrackDtoToJSON(value?: AlbumTrackDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'playbackId': value.playbackId,
        'name': value.name,
        'duration': value.duration,
        'uri': value.uri,
        'isPlayable': value.isPlayable,
        'isExplicit': value.isExplicit,
        'discNumber': value.discNumber,
        'artists': ((value.artists as Array<any>).map(ArtistBriefDtoToJSON)),
    };
}

