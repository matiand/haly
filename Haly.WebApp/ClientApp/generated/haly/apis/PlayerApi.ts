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
  DeviceDto,
  PlaybackStateDto,
  Problem,
  TrackDto,
} from '../models';
import {
    DeviceDtoFromJSON,
    DeviceDtoToJSON,
    PlaybackStateDtoFromJSON,
    PlaybackStateDtoToJSON,
    ProblemFromJSON,
    ProblemToJSON,
    TrackDtoFromJSON,
    TrackDtoToJSON,
} from '../models';

export interface SetRepeatModeRequest {
    repeatMode?: string;
}

export interface ShuffleRequest {
    state?: boolean;
}

export interface TransferPlaybackRequest {
    deviceId?: string;
}

/**
 * 
 */
export class PlayerApi extends runtime.BaseAPI {

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-playback-state </b>
     * Get available devices that current user can connect to
     */
    async getAvailableDevicesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<DeviceDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player/devices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DeviceDtoFromJSON));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-playback-state </b>
     * Get available devices that current user can connect to
     */
    async getAvailableDevices(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<DeviceDto>> {
        const response = await this.getAvailableDevicesRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-playback-state </b>
     * Get current playback state
     */
    async getPlaybackStateRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlaybackStateDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlaybackStateDtoFromJSON(jsonValue));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-playback-state </b>
     * Get current playback state
     */
    async getPlaybackState(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlaybackStateDto> {
        const response = await this.getPlaybackStateRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-playback-state </b>
     * Get current user\'s track queue
     */
    async getQueueRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TrackDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player/queue`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TrackDtoFromJSON));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-playback-state </b>
     * Get current user\'s track queue
     */
    async getQueue(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TrackDto>> {
        const response = await this.getQueueRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-recently-played </b>
     * Get current user\'s track history
     */
    async getRecentlyPlayedRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TrackDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player/recently-played`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TrackDtoFromJSON));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-read-recently-played </b>
     * Get current user\'s track history
     */
    async getRecentlyPlayed(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TrackDto>> {
        const response = await this.getRecentlyPlayedRaw(initOverrides);
        return await response.value();
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-modify-playback-state </b>
     * Set the repeat mode for the user\'s playback.
     */
    async setRepeatModeRaw(requestParameters: SetRepeatModeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.repeatMode !== undefined) {
            queryParameters['repeatMode'] = requestParameters.repeatMode;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player/repeat-mode`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-modify-playback-state </b>
     * Set the repeat mode for the user\'s playback.
     */
    async setRepeatMode(requestParameters: SetRepeatModeRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.setRepeatModeRaw(requestParameters, initOverrides);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-modify-playback-state </b>
     * Toggle shuffle on or off
     */
    async shuffleRaw(requestParameters: ShuffleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.state !== undefined) {
            queryParameters['state'] = requestParameters.state;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player/shuffle`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-modify-playback-state </b>
     * Toggle shuffle on or off
     */
    async shuffle(requestParameters: ShuffleRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.shuffleRaw(requestParameters, initOverrides);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-modify-playback-state </b>
     * Transfer playback to a new device
     */
    async transferPlaybackRaw(requestParameters: TransferPlaybackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.deviceId !== undefined) {
            queryParameters['deviceId'] = requestParameters.deviceId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Me/Player`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> user-modify-playback-state </b>
     * Transfer playback to a new device
     */
    async transferPlayback(requestParameters: TransferPlaybackRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.transferPlaybackRaw(requestParameters, initOverrides);
    }

}
