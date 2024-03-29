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
import type { AddToQueueRequestBody } from './AddToQueueRequestBody';
import {
    AddToQueueRequestBodyFromJSON,
    AddToQueueRequestBodyFromJSONTyped,
    AddToQueueRequestBodyToJSON,
} from './AddToQueueRequestBody';

/**
 * 
 * @export
 * @interface AddToQueueRequest
 */
export interface AddToQueueRequest {
    /**
     * 
     * @type {string}
     * @memberof AddToQueueRequest
     */
    collectionUri?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof AddToQueueRequest
     */
    trackUris?: Array<string> | null;
}

/**
 * Check if a given object implements the AddToQueueRequest interface.
 */
export function instanceOfAddToQueueRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AddToQueueRequestFromJSON(json: any): AddToQueueRequest {
    return AddToQueueRequestFromJSONTyped(json, false);
}

export function AddToQueueRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddToQueueRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'collectionUri': !exists(json, 'collectionUri') ? undefined : json['collectionUri'],
        'trackUris': !exists(json, 'trackUris') ? undefined : json['trackUris'],
    };
}

export function AddToQueueRequestToJSON(value?: AddToQueueRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'collectionUri': value.collectionUri,
        'trackUris': value.trackUris,
    };
}

