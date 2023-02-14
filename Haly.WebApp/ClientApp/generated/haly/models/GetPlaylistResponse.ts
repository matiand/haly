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
import type { TrackDtoPaginatedList } from './TrackDtoPaginatedList';
import {
    TrackDtoPaginatedListFromJSON,
    TrackDtoPaginatedListFromJSONTyped,
    TrackDtoPaginatedListToJSON,
} from './TrackDtoPaginatedList';

/**
 * 
 * @export
 * @interface GetPlaylistResponse
 */
export interface GetPlaylistResponse {
    /**
     * 
     * @type {string}
     * @memberof GetPlaylistResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof GetPlaylistResponse
     */
    name: string;
    /**
     * 
     * @type {PlaylistMetadataDto}
     * @memberof GetPlaylistResponse
     */
    metadata: PlaylistMetadataDto;
    /**
     * 
     * @type {TrackDtoPaginatedList}
     * @memberof GetPlaylistResponse
     */
    tracks: TrackDtoPaginatedList;
}

/**
 * Check if a given object implements the GetPlaylistResponse interface.
 */
export function instanceOfGetPlaylistResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "metadata" in value;
    isInstance = isInstance && "tracks" in value;

    return isInstance;
}

export function GetPlaylistResponseFromJSON(json: any): GetPlaylistResponse {
    return GetPlaylistResponseFromJSONTyped(json, false);
}

export function GetPlaylistResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPlaylistResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'metadata': PlaylistMetadataDtoFromJSON(json['metadata']),
        'tracks': TrackDtoPaginatedListFromJSON(json['tracks']),
    };
}

export function GetPlaylistResponseToJSON(value?: GetPlaylistResponse | null): any {
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
        'tracks': TrackDtoPaginatedListToJSON(value.tracks),
    };
}

