import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvaibilityType, DeviceInfo, FormFactorType, OSType, RegionType } from "./deviceInfo";


// Place reducers here.

const initialState = {
    region: "eu" as RegionType,
    devices: [] as DeviceInfo[],
    availableDevices: [] as string[],
    filteredDevices: [] as DeviceInfo[],
    isDeviceLoading: false,
    isAvaliableDevicesLoading: false,
    osFilterKey: "All" as OSType,
    availabilityFilterKey: "All" as AvaibilityType,
    formFactorFilterKey: "All" as FormFactorType,
    errors: {
        deviceList: "",
        availabilityList: ""
    }
};

export type DeviceState = typeof initialState;

export const HelperFunctions = {

    filterDevices: (state: DeviceState) => {
        const { devices, osFilterKey, availabilityFilterKey, formFactorFilterKey } = state;

        if (osFilterKey === "All" && availabilityFilterKey === "All" && formFactorFilterKey === "All") {
            return devices;
        }
        const osSearchKey = osFilterKey.toUpperCase();
        const avaibilitySearchKey = availabilityFilterKey.toUpperCase();
        const formFactorSearchKey = formFactorFilterKey.toUpperCase();
        return devices.filter(item => {

            const isOsMatched = osFilterKey === "All" ? true : item.os.toUpperCase().trim() === osSearchKey;
            const isFormFactorMatched = formFactorFilterKey === "All" ? true : item.formFactor.toUpperCase().trim() === formFactorSearchKey;
            const isAvaibilityMatched = availabilityFilterKey === "All" ? true : (item.availability ? item.availability.toUpperCase().trim() === avaibilitySearchKey : true);
            return isOsMatched && isAvaibilityMatched && isFormFactorMatched;
        });

    },
    updateDeviceAvailability: (deviceDetails: DeviceInfo[] = [], availableDevices: string[] = []) => {
        if (availableDevices.length === 0) {
            return deviceDetails as DeviceInfo[];
        }

        return deviceDetails.map(device => {
            const index = availableDevices.findIndex(descriptorId => {

                const a = descriptorId.toUpperCase().trim();
                const b = device.descriptorId.toUpperCase().trim();
                return a === b;
            })

            const availabilityInfo: AvaibilityType = index === -1 ? "Not Available" : "Available";

            return { ...device, availability: availabilityInfo } as DeviceInfo;
        });

    }
};


export const availableDevicesSlice = createSlice({
    name: "availabledevices",
    initialState: initialState,
    reducers: {
        fetchDevices: state => {
            state.isDeviceLoading = true;
        },
        fetchDevicesSuccess: (state, action: PayloadAction<DeviceInfo[]>) => {
            state.devices = action.payload || [];
            state.errors.deviceList = "";
            state.isDeviceLoading = false;
            state.devices = HelperFunctions.updateDeviceAvailability(state.devices, state.availableDevices);
            state.filteredDevices = HelperFunctions.filterDevices(state);

        },
        fetchDevicesError: (state, action: PayloadAction<Error>) => {
            state.errors.deviceList = action.payload.message;
            state.isDeviceLoading = false;
        },
        fetchAvailability: state => {
            state.isAvaliableDevicesLoading = true;
        },
        fetchAvailabilityError: (state, action: PayloadAction<Error>) => {
            state.isAvaliableDevicesLoading = false;
            state.errors.availabilityList = action.payload.message;
        },
        fetchAvailabilitySuccess: (state, action: PayloadAction<string[]>) => {
            state.availableDevices = action.payload;
            state.errors.availabilityList = "";
            state.isAvaliableDevicesLoading = false;
            state.devices = HelperFunctions.updateDeviceAvailability(state.devices, state.availableDevices);
            state.filteredDevices = HelperFunctions.filterDevices(state);
        },
        filterDevicesByOs: (state, action: PayloadAction<OSType>) => {
            state.osFilterKey = action.payload;
            state.filteredDevices = HelperFunctions.filterDevices(state);
        },
        filterDevicesByAvailability: (state, action: PayloadAction<AvaibilityType>) => {
            state.availabilityFilterKey = action.payload;
            state.filteredDevices = HelperFunctions.filterDevices(state);
        },
        filterDevicesByFormFactor: (state, action: PayloadAction<FormFactorType>) => {
            state.formFactorFilterKey = action.payload;
            state.filteredDevices = HelperFunctions.filterDevices(state);
        },
        updateRegion: (state, action: PayloadAction<RegionType>) => {
            state.region = action.payload;
        }
    }
});

export default availableDevicesSlice.reducer;
export const actions = availableDevicesSlice.actions;