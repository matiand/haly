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
import type { PlaylistMetadataDto } from './PlaylistMetadataDto';
import {
    PlaylistMetadataDtoFromJSON,
    PlaylistMetadataDtoFromJSONTyped,
    PlaylistMetadataDtoToJSON,
} from './PlaylistMetadataDto';
import type { PlaylistTrackDtoPaginatedList } from './PlaylistTrackDtoPaginatedList';
import {
    PlaylistTrackDtoPaginatedListFromJSON,
    PlaylistTrackDtoPaginatedListFromJSONTyped,
    PlaylistTrackDtoPaginatedListToJSON,
} from './PlaylistTrackDtoPaginatedList';

/**
 * 
 * @export
 * @interface PlaylistWithTracksDto
 */
export interface PlaylistWithTracksDto {
    /**
     * 
     * @type {string}
     * @memberof PlaylistWithTracksDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistWithTracksDto
     */
    name: string;
    /**
     * 
     * @type {PlaylistMetadataDto}
     * @memberof PlaylistWithTracksDto
     */
    metadata: PlaylistMetadataDto;
    /**
     * 
     * @type {boolean}
     * @memberof PlaylistWithTracksDto
     */
    isPersonalized: boolean;
    /**
     * 
     * @type {PlaylistTrackDtoPaginatedList}
     * @memberof PlaylistWithTracksDto
     */
    tracks: PlaylistTrackDtoPaginatedList;
    /**
     * 
     * @type {string}
     * @memberof PlaylistWithTracksDto
     */
    totalDuration: string;
}

/**
 * Check if a given object implements the PlaylistWithTracksDto interface.
 */
export function instanceOfPlaylistWithTracksDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "metadata" in value;
    isInstance = isInstance && "isPersonalized" in value;
    isInstance = isInstance && "tracks" in value;
    isInstance = isInstance && "totalDuration" in value;

    return isInstance;
}

export function PlaylistWithTracksDtoFromJSON(json: any): PlaylistWithTracksDto {
    return PlaylistWithTracksDtoFromJSONTyped(json, false);
}

export function PlaylistWithTracksDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaylistWithTracksDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'metadata': PlaylistMetadataDtoFromJSON(json['metadata']),
        'isPersonalized': json['isPersonalized'],
        'tracks': PlaylistTrackDtoPaginatedListFromJSON(json['tracks']),
        'totalDuration': json['totalDuration'],
    };
}

export function PlaylistWithTracksDtoToJSON(value?: PlaylistWithTracksDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'metadata': PlaylistMetadataDtoToJSON(value.metadata),
        'isPersonalized': value.isPersonalized,
        'tracks': PlaylistTrackDtoPaginatedListToJSON(value.tracks),
        'totalDuration': value.totalDuration,
    };
}

