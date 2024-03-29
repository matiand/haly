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
import type { PaginatedTracksDtoPage } from './PaginatedTracksDtoPage';
import {
    PaginatedTracksDtoPageFromJSON,
    PaginatedTracksDtoPageFromJSONTyped,
    PaginatedTracksDtoPageToJSON,
} from './PaginatedTracksDtoPage';

/**
 * 
 * @export
 * @interface PaginatedTracksDto
 */
export interface PaginatedTracksDto {
    /**
     * 
     * @type {PaginatedTracksDtoPage}
     * @memberof PaginatedTracksDto
     */
    page: PaginatedTracksDtoPage;
    /**
     * 
     * @type {string}
     * @memberof PaginatedTracksDto
     */
    totalDuration: string;
}

/**
 * Check if a given object implements the PaginatedTracksDto interface.
 */
export function instanceOfPaginatedTracksDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "page" in value;
    isInstance = isInstance && "totalDuration" in value;

    return isInstance;
}

export function PaginatedTracksDtoFromJSON(json: any): PaginatedTracksDto {
    return PaginatedTracksDtoFromJSONTyped(json, false);
}

export function PaginatedTracksDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedTracksDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': PaginatedTracksDtoPageFromJSON(json['page']),
        'totalDuration': json['totalDuration'],
    };
}

export function PaginatedTracksDtoToJSON(value?: PaginatedTracksDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': PaginatedTracksDtoPageToJSON(value.page),
        'totalDuration': value.totalDuration,
    };
}

