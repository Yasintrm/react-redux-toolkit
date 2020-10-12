import axios from 'axios';
import { DeviceInfo, RegionType } from './deviceInfo';
import { Constants } from './constants';
import { actions } from './deviceSlice';
import { AppState, AppThunk } from '../../store';
import { Action, ThunkAction } from '@reduxjs/toolkit';

export type DeviceThunk = ThunkAction<Promise<DeviceInfo[]>, AppState, unknown, Action<string>>;
export type AvailabilityThunk = ThunkAction<Promise<string[]>, AppState, unknown, Action<string>>;


const { fetchDevices,
    fetchDevicesError,
    fetchDevicesSuccess,
    fetchAvailability,
    fetchAvailabilityError,
    fetchAvailabilitySuccess
} = actions;

export const fetchDevicesAsync = (region: RegionType): DeviceThunk => async dispatch => {
    dispatch(fetchDevices());
    try {
        const result = await axios.get<DeviceInfo[]>(Constants.apiEndPoints[region].devices);

        const devices = result.data.map((device, index) => ({ ...device, id: index.toString() }));
        dispatch(fetchDevicesSuccess(devices));
        return devices;
    } catch (err) {
        dispatch(fetchDevicesError(err));
        return err;
    }
}

export const fetchAvailabilityAsync = (region: RegionType): AvailabilityThunk => async dispatch => {
    dispatch(fetchAvailability());
    try {
        const result = await axios.get<string[]>(Constants.apiEndPoints[region].availability);
        dispatch(fetchAvailabilitySuccess(result.data));
        return result;
    } catch (err) {
        dispatch(fetchAvailabilityError(err));
        return err;
    }
}