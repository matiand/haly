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
 * @interface ReleaseItemDto
 */
export interface ReleaseItemDto {
    /**
     * 
     * @type {string}
     * @memberof ReleaseItemDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ReleaseItemDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ReleaseItemDto
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ReleaseItemDto
     */
    type: string;
    /**
     * 
     * @type {Date}
     * @memberof ReleaseItemDto
     */
    releaseDate: Date;
    /**
     * 
     * @type {number}
     * @memberof ReleaseItemDto
     */
    releaseYear: number;
    /**
     * 
     * @type {Array<ArtistBriefDto>}
     * @memberof ReleaseItemDto
     */
    artists: Array<ArtistBriefDto>;
}

/**
 * Check if a given object implements the ReleaseItemDto interface.
 */
export function instanceOfReleaseItemDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "releaseDate" in value;
    isInstance = isInstance && "releaseYear" in value;
    isInstance = isInstance && "artists" in value;

    return isInstance;
}

export function ReleaseItemDtoFromJSON(json: any): ReleaseItemDto {
    return ReleaseItemDtoFromJSONTyped(json, false);
}

export function ReleaseItemDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseItemDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'type': json['type'],
        'releaseDate': (new Date(json['releaseDate'])),
        'releaseYear': json['releaseYear'],
        'artists': ((json['artists'] as Array<any>).map(ArtistBriefDtoFromJSON)),
    };
}

export function ReleaseItemDtoToJSON(value?: ReleaseItemDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'imageUrl': value.imageUrl,
        'type': value.type,
        'releaseDate': (value.releaseDate.toISOString().substr(0,10)),
        'releaseYear': value.releaseYear,
        'artists': ((value.artists as Array<any>).map(ArtistBriefDtoToJSON)),
    };
}

