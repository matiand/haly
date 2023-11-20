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
import type { RemoveTrackDto } from './RemoveTrackDto';
import {
    RemoveTrackDtoFromJSON,
    RemoveTrackDtoFromJSONTyped,
    RemoveTrackDtoToJSON,
} from './RemoveTrackDto';
import type { RemoveTracksRequestBody } from './RemoveTracksRequestBody';
import {
    RemoveTracksRequestBodyFromJSON,
    RemoveTracksRequestBodyFromJSONTyped,
    RemoveTracksRequestBodyToJSON,
} from './RemoveTracksRequestBody';

/**
 * 
 * @export
 * @interface RemoveTracksRequest
 */
export interface RemoveTracksRequest {
    /**
     * 
     * @type {Array<RemoveTrackDto>}
     * @memberof RemoveTracksRequest
     */
    tracks: Array<RemoveTrackDto>;
}

/**
 * Check if a given object implements the RemoveTracksRequest interface.
 */
export function instanceOfRemoveTracksRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tracks" in value;

    return isInstance;
}

export function RemoveTracksRequestFromJSON(json: any): RemoveTracksRequest {
    return RemoveTracksRequestFromJSONTyped(json, false);
}

export function RemoveTracksRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RemoveTracksRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tracks': ((json['tracks'] as Array<any>).map(RemoveTrackDtoFromJSON)),
    };
}

export function RemoveTracksRequestToJSON(value?: RemoveTracksRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tracks': ((value.tracks as Array<any>).map(RemoveTrackDtoToJSON)),
    };
}

