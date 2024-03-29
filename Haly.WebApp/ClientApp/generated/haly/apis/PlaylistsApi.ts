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
  AddTracksRequest,
  DuplicateProblem,
  PaginatedTracksDto,
  PlaylistBriefDto,
  PlaylistWithTracksDto,
  Problem,
  RemoveTracksRequest,
  UpdatePlaylistDetailsRequest,
  ValidationProblem,
} from '../models';
import {
    AddTracksRequestFromJSON,
    AddTracksRequestToJSON,
    DuplicateProblemFromJSON,
    DuplicateProblemToJSON,
    PaginatedTracksDtoFromJSON,
    PaginatedTracksDtoToJSON,
    PlaylistBriefDtoFromJSON,
    PlaylistBriefDtoToJSON,
    PlaylistWithTracksDtoFromJSON,
    PlaylistWithTracksDtoToJSON,
    ProblemFromJSON,
    ProblemToJSON,
    RemoveTracksRequestFromJSON,
    RemoveTracksRequestToJSON,
    UpdatePlaylistDetailsRequestFromJSON,
    UpdatePlaylistDetailsRequestToJSON,
    ValidationProblemFromJSON,
    ValidationProblemToJSON,
} from '../models';

export interface AddTracksOperationRequest {
    playlistId: string;
    addTracksRequest?: AddTracksRequest;
}

export interface GetPlaylistRequest {
    id: string;
    sortOrder?: string;
}

export interface GetTracksRequest {
    playlistId: string;
    limit?: number;
    offset?: number;
    sortOrder?: string;
    searchTerm?: string;
}

export interface PutPlaylistRequest {
    id: string;
    forceUpdate?: boolean;
}

export interface RemoveTracksOperationRequest {
    playlistId: string;
    removeTracksRequest?: RemoveTracksRequest;
}

export interface UpdatePlaylistDetailsOperationRequest {
    playlistId: string;
    updatePlaylistDetailsRequest?: UpdatePlaylistDetailsRequest;
}

/**
 * 
 */
export class PlaylistsApi extends runtime.BaseAPI {

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public, playlist-modify-private </b>
     * Add tracks to a playlist
     */
    async addTracksRaw(requestParameters: AddTracksOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlaylistBriefDto>> {
        if (requestParameters.playlistId === null || requestParameters.playlistId === undefined) {
            throw new runtime.RequiredError('playlistId','Required parameter requestParameters.playlistId was null or undefined when calling addTracks.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Playlists/{playlistId}/tracks`.replace(`{${"playlistId"}}`, encodeURIComponent(String(requestParameters.playlistId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddTracksRequestToJSON(requestParameters.addTracksRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlaylistBriefDtoFromJSON(jsonValue));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public, playlist-modify-private </b>
     * Add tracks to a playlist
     */
    async addTracks(requestParameters: AddTracksOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlaylistBriefDto> {
        const response = await this.addTracksRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get playlist from our cache
     * Get playlist
     */
    async getPlaylistRaw(requestParameters: GetPlaylistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlaylistWithTracksDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPlaylist.');
        }

        const queryParameters: any = {};

        if (requestParameters.sortOrder !== undefined) {
            queryParameters['sortOrder'] = requestParameters.sortOrder;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Playlists/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlaylistWithTracksDtoFromJSON(jsonValue));
    }

    /**
     * Get playlist from our cache
     * Get playlist
     */
    async getPlaylist(requestParameters: GetPlaylistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlaylistWithTracksDto> {
        const response = await this.getPlaylistRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get playlist\'s tracks from our cache
     * Get playlist\'s tracks
     */
    async getTracksRaw(requestParameters: GetTracksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedTracksDto>> {
        if (requestParameters.playlistId === null || requestParameters.playlistId === undefined) {
            throw new runtime.RequiredError('playlistId','Required parameter requestParameters.playlistId was null or undefined when calling getTracks.');
        }

        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.sortOrder !== undefined) {
            queryParameters['sortOrder'] = requestParameters.sortOrder;
        }

        if (requestParameters.searchTerm !== undefined) {
            queryParameters['searchTerm'] = requestParameters.searchTerm;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Playlists/{playlistId}/tracks`.replace(`{${"playlistId"}}`, encodeURIComponent(String(requestParameters.playlistId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedTracksDtoFromJSON(jsonValue));
    }

    /**
     * Get playlist\'s tracks from our cache
     * Get playlist\'s tracks
     */
    async getTracks(requestParameters: GetTracksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedTracksDto> {
        const response = await this.getTracksRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetch playlist from Spotify and update our cache if it\'s changed<br/>This endpoint calls Spotify API.
     * Update playlist
     */
    async putPlaylistRaw(requestParameters: PutPlaylistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putPlaylist.');
        }

        const queryParameters: any = {};

        if (requestParameters.forceUpdate !== undefined) {
            queryParameters['forceUpdate'] = requestParameters.forceUpdate;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Playlists/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Fetch playlist from Spotify and update our cache if it\'s changed<br/>This endpoint calls Spotify API.
     * Update playlist
     */
    async putPlaylist(requestParameters: PutPlaylistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.putPlaylistRaw(requestParameters, initOverrides);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public, playlist-modify-private </b>
     * Remove tracks from a playlist
     */
    async removeTracksRaw(requestParameters: RemoveTracksOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlaylistBriefDto>> {
        if (requestParameters.playlistId === null || requestParameters.playlistId === undefined) {
            throw new runtime.RequiredError('playlistId','Required parameter requestParameters.playlistId was null or undefined when calling removeTracks.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Playlists/{playlistId}/tracks`.replace(`{${"playlistId"}}`, encodeURIComponent(String(requestParameters.playlistId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: RemoveTracksRequestToJSON(requestParameters.removeTracksRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlaylistBriefDtoFromJSON(jsonValue));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public, playlist-modify-private </b>
     * Remove tracks from a playlist
     */
    async removeTracks(requestParameters: RemoveTracksOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlaylistBriefDto> {
        const response = await this.removeTracksRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public, playlist-modify-private </b>
     * Update playlist details
     */
    async updatePlaylistDetailsRaw(requestParameters: UpdatePlaylistDetailsOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.playlistId === null || requestParameters.playlistId === undefined) {
            throw new runtime.RequiredError('playlistId','Required parameter requestParameters.playlistId was null or undefined when calling updatePlaylistDetails.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Playlists/{playlistId}/details`.replace(`{${"playlistId"}}`, encodeURIComponent(String(requestParameters.playlistId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdatePlaylistDetailsRequestToJSON(requestParameters.updatePlaylistDetailsRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public, playlist-modify-private </b>
     * Update playlist details
     */
    async updatePlaylistDetails(requestParameters: UpdatePlaylistDetailsOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updatePlaylistDetailsRaw(requestParameters, initOverrides);
    }

}
