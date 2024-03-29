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
import type { PlaylistTrackDto } from './PlaylistTrackDto';
import {
    PlaylistTrackDtoFromJSON,
    PlaylistTrackDtoFromJSONTyped,
    PlaylistTrackDtoToJSON,
} from './PlaylistTrackDto';
import type { PlaylistTrackDtoPaginatedList } from './PlaylistTrackDtoPaginatedList';
import {
    PlaylistTrackDtoPaginatedListFromJSON,
    PlaylistTrackDtoPaginatedListFromJSONTyped,
    PlaylistTrackDtoPaginatedListToJSON,
} from './PlaylistTrackDtoPaginatedList';

/**
 * 
 * @export
 * @interface PaginatedTracksDtoPage
 */
export interface PaginatedTracksDtoPage {
    /**
     * 
     * @type {number}
     * @memberof PaginatedTracksDtoPage
     */
    limit: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedTracksDtoPage
     */
    offset: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedTracksDtoPage
     */
    total: number;
    /**
     * 
     * @type {Array<PlaylistTrackDto>}
     * @memberof PaginatedTracksDtoPage
     */
    items: Array<PlaylistTrackDto>;
}

/**
 * Check if a given object implements the PaginatedTracksDtoPage interface.
 */
export function instanceOfPaginatedTracksDtoPage(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "limit" in value;
    isInstance = isInstance && "offset" in value;
    isInstance = isInstance && "total" in value;
    isInstance = isInstance && "items" in value;

    return isInstance;
}

export function PaginatedTracksDtoPageFromJSON(json: any): PaginatedTracksDtoPage {
    return PaginatedTracksDtoPageFromJSONTyped(json, false);
}

export function PaginatedTracksDtoPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedTracksDtoPage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'limit': json['limit'],
        'offset': json['offset'],
        'total': json['total'],
        'items': ((json['items'] as Array<any>).map(PlaylistTrackDtoFromJSON)),
    };
}

export function PaginatedTracksDtoPageToJSON(value?: PaginatedTracksDtoPage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'limit': value.limit,
        'offset': value.offset,
        'total': value.total,
        'items': ((value.items as Array<any>).map(PlaylistTrackDtoToJSON)),
    };
}

