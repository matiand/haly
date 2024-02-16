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
import type { GeniusQueryBody } from './GeniusQueryBody';
import {
    GeniusQueryBodyFromJSON,
    GeniusQueryBodyFromJSONTyped,
    GeniusQueryBodyToJSON,
} from './GeniusQueryBody';

/**
 * 
 * @export
 * @interface PutLyricsRequest
 */
export interface PutLyricsRequest {
    /**
     * 
     * @type {string}
     * @memberof PutLyricsRequest
     */
    trackName: string;
    /**
     * 
     * @type {string}
     * @memberof PutLyricsRequest
     */
    artistName: string;
    /**
     * 
     * @type {string}
     * @memberof PutLyricsRequest
     */
    geniusToken: string;
}

/**
 * Check if a given object implements the PutLyricsRequest interface.
 */
export function instanceOfPutLyricsRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "trackName" in value;
    isInstance = isInstance && "artistName" in value;
    isInstance = isInstance && "geniusToken" in value;

    return isInstance;
}

export function PutLyricsRequestFromJSON(json: any): PutLyricsRequest {
    return PutLyricsRequestFromJSONTyped(json, false);
}

export function PutLyricsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PutLyricsRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'trackName': json['trackName'],
        'artistName': json['artistName'],
        'geniusToken': json['geniusToken'],
    };
}

export function PutLyricsRequestToJSON(value?: PutLyricsRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'trackName': value.trackName,
        'artistName': value.artistName,
        'geniusToken': value.geniusToken,
    };
}
