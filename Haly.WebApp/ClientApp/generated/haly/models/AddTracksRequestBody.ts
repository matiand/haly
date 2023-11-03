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
/**
 * 
 * @export
 * @interface AddTracksRequestBody
 */
export interface AddTracksRequestBody {
    /**
     * 
     * @type {string}
     * @memberof AddTracksRequestBody
     */
    collectionUri?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof AddTracksRequestBody
     */
    trackUris?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof AddTracksRequestBody
     */
    allowDuplicates: boolean;
}

/**
 * Check if a given object implements the AddTracksRequestBody interface.
 */
export function instanceOfAddTracksRequestBody(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "allowDuplicates" in value;

    return isInstance;
}

export function AddTracksRequestBodyFromJSON(json: any): AddTracksRequestBody {
    return AddTracksRequestBodyFromJSONTyped(json, false);
}

export function AddTracksRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddTracksRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'collectionUri': !exists(json, 'collectionUri') ? undefined : json['collectionUri'],
        'trackUris': !exists(json, 'trackUris') ? undefined : json['trackUris'],
        'allowDuplicates': json['allowDuplicates'],
    };
}

export function AddTracksRequestBodyToJSON(value?: AddTracksRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'collectionUri': value.collectionUri,
        'trackUris': value.trackUris,
        'allowDuplicates': value.allowDuplicates,
    };
}

