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
  FollowedArtistDto,
  PlaylistBriefDto,
  PlaylistTrackDto,
  PrivateUserDto,
  Problem,
  TopArtistDto,
  UserFeedDto,
} from '../models';
import {
    FollowedArtistDtoFromJSON,
    FollowedArtistDtoToJSON,
    PlaylistBriefDtoFromJSON,
    PlaylistBriefDtoToJSON,
    PlaylistTrackDtoFromJSON,
    PlaylistTrackDtoToJSON,
    PrivateUserDtoFromJSON,
    PrivateUserDtoToJSON,
    ProblemFromJSON,
    ProblemToJSON,
    TopArtistDtoFromJSON,
    TopArtistDtoToJSON,
    UserFeedDtoFromJSON,
    UserFeedDtoToJSON,
} from '../models';

export interface PutCurrentUserRequest {
    body?: string;
}

/**
 * 
 */
export class MeApi extends runtime.BaseAPI {

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-follow-read </b>
     * Fetch current user\'s followed artists from Spotify
     */
    async getFollowedArtistsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<FollowedArtistDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/artists`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(FollowedArtistDtoFromJSON));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-follow-read </b>
     * Fetch current user\'s followed artists from Spotify
     */
    async getFollowedArtists(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<FollowedArtistDto>> {
        const response = await this.getFollowedArtistsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Fetch current user\'s \'Liked Songs\' collection from our cache
     */
    async getLikedSongsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlaylistTrackDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/tracks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlaylistTrackDtoFromJSON));
    }

    /**
     * Fetch current user\'s \'Liked Songs\' collection from our cache
     */
    async getLikedSongs(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlaylistTrackDto>> {
        const response = await this.getLikedSongsRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-top-read </b>
     * Fetch current user\'s top artists from Spotify
     */
    async getTopArtistsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TopArtistDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/top/artists`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TopArtistDtoFromJSON));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-top-read </b>
     * Fetch current user\'s top artists from Spotify
     */
    async getTopArtists(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TopArtistDto>> {
        const response = await this.getTopArtistsRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-top-read, user-read-recently-played </b>
     * Fetch current user\'s feed
     */
    async getUserFeedRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserFeedDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/feed`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFeedDtoFromJSON(jsonValue));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-top-read, user-read-recently-played </b>
     * Fetch current user\'s feed
     */
    async getUserFeed(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserFeedDto> {
        const response = await this.getUserFeedRaw(initOverrides);
        return await response.value();
    }

    /**
     * Updates the User linked with specified token by fetching him from Spotify API, creates a new one for first time clients. Successful response links that token with our CurrentUser, and allows us to use endpoints that call Spotify API.<br/><br/>This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-private </b>
     * Update current user
     */
    async putCurrentUserRaw(requestParameters: PutCurrentUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PrivateUserDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Me`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PrivateUserDtoFromJSON(jsonValue));
    }

    /**
     * Updates the User linked with specified token by fetching him from Spotify API, creates a new one for first time clients. Successful response links that token with our CurrentUser, and allows us to use endpoints that call Spotify API.<br/><br/>This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-private </b>
     * Update current user
     */
    async putCurrentUser(requestParameters: PutCurrentUserRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PrivateUserDto> {
        const response = await this.putCurrentUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-read-private, playlist-read-collaborative </b>
     * Fetch current user\'s playlists from Spotify and update our cache if they\'re changed
     */
    async putCurrentUserPlaylistsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlaylistBriefDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/playlists`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlaylistBriefDtoFromJSON));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-read-private, playlist-read-collaborative </b>
     * Fetch current user\'s playlists from Spotify and update our cache if they\'re changed
     */
    async putCurrentUserPlaylists(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlaylistBriefDto>> {
        const response = await this.putCurrentUserPlaylistsRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-library-read </b>
     * Fetch current user\'s \'Liked Songs\' collection from Spotify and update our cache if it\'s changed
     */
    async putLikedSongsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/tracks`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-library-read </b>
     * Fetch current user\'s \'Liked Songs\' collection from Spotify and update our cache if it\'s changed
     */
    async putLikedSongs(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.putLikedSongsRaw(initOverrides);
    }

}
