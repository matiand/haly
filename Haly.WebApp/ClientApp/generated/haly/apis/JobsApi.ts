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


import * as runtime from '../runtime';
import type {
  Problem,
} from '../models';
import {
    ProblemFromJSON,
    ProblemToJSON,
} from '../models';

/**
 * 
 */
export class JobsApi extends runtime.BaseAPI {

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-read-private </b>
     * Refetch current user\'s playlist tracks
     */
    async refetchCurrentUserPlaylistTracksRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Jobs/playlist-tracks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-read-private </b>
     * Refetch current user\'s playlist tracks
     */
    async refetchCurrentUserPlaylistTracks(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.refetchCurrentUserPlaylistTracksRaw(initOverrides);
    }

}