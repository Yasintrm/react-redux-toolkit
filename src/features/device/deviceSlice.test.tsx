import { DeviceInfo } from "./deviceInfo";
import DeviceReducer, { actions, DeviceState } from "./deviceSlice";

const {
    fetchDevices,
    fetchDevicesSuccess,
    fetchDevicesError,
    fetchAvailability,
    fetchAvailabilitySuccess,
    fetchAvailabilityError,
    filterDevicesByAvailability,
    filterDevicesByFormFactor,
    filterDevicesByOs,
    updateRegion
} = actions;

describe("root reducer", () => {

    const setup = () => {
        const initialState: DeviceState = {
            availabilityFilterKey: "All",
            availableDevices: [],
            devices: [],
            errors: {
                availabilityList: "",
                deviceList: ""
            },
            filteredDevices: [],
            formFactorFilterKey: "All",
            isAvaliableDevicesLoading: false,
            isDeviceLoading: false,
            osFilterKey: "All",
            region: "eu"
        };

        const euDevices: DeviceInfo[] = [
            {
                "id": "1",
                "abiType": "arm64-v8a",
                "apiLevel": 27,
                "cloudType": "PUBLIC",
                "compositeId": "EU_LG_Nexus_5X_real",
                "connectivity": [
                    "WIFI"
                ],
                "cpuType": "ARM",
                "cpuCores": 6,
                "cpuFrequency": 1440,
                "dataCenterId": "EU",
                "descriptorId": "LG_Nexus_5X_real",
                "dpi": 424,
                "dpiName": "xxhdpi",
                "freeOfCharge": false,
                "formFactor": "PHONE",
                "hasOnScreenButtons": true,
                "includedInPlan": false,
                "internalStorageSize": 16384,
                "manufacturers": [
                    "LG"
                ],
                "modelNumber": "NEXUS5X",
                "name": "LG Nexus 5X",
                "os": "ANDROID",
                "osVersion": "8.1.0",
                "ramSize": 2048,
                "resolutionHeight": 1920,
                "resolutionWidth": 1080,
                "screenSize": 5.2,
                "supportsAppiumWebAppTesting": true,
                "supportsQualityReport": true,
                "availability": "Available"
            },
            {
                "id": "2",
                "abiType": "armeabi-v7a",
                "apiLevel": 19,
                "cloudType": "PUBLIC",
                "compositeId": "EU_Samsung_Galaxy_Note_II_N7100_real",
                "connectivity": [
                    "WIFI"
                ],
                "cpuType": "ARM",
                "cpuCores": 4,
                "cpuFrequency": 1600,
                "dataCenterId": "EU",
                "descriptorId": "Samsung_Galaxy_Note_II_N7100_real",
                "dpi": 240,
                "dpiName": "hdpi",
                "freeOfCharge": false,
                "formFactor": "PHONE",
                "hasOnScreenButtons": false,
                "includedInPlan": false,
                "internalStorageSize": 16384,
                "manufacturers": [
                    "Samsung"
                ],
                "modelNumber": "SM-N7000",
                "name": "Samsung Galaxy Note II N7100",
                "os": "ANDROID",
                "osVersion": "4.4.2",
                "ramSize": 2048,
                "resolutionHeight": 1280,
                "resolutionWidth": 720,
                "screenSize": 5.5,
                "supportsAppiumWebAppTesting": false,
                "supportsQualityReport": true,
                "availability": "Not Available"
            }];

        const euAvailability = [
            "LG_Nexus_5X_real",
            "EU_Samsung_Galaxy_Note_II_N7100_not_real"
        ];

        return { initialState, euDevices, euAvailability };
    };

    type SetupType = ReturnType<typeof setup>;

    let obj: SetupType;

    beforeEach(() => {
        obj = setup();
    });

    it("should return the default state for invalid action type", () => {
        expect(
            DeviceReducer(obj.initialState, { type: "test", payload: "test" })
        ).toEqual(obj.initialState);
    });

    it("should update the initialState.isLoading to true for fetchDevices", () => {
        const action = fetchDevices();
        const targetVal: DeviceState = { ...obj.initialState, isDeviceLoading: true };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the devices and filtered devices for fetchDevicesSuccess", () => {
        const action = fetchDevicesSuccess(obj.euDevices);
        const targetVal: DeviceState = {
            ...obj.initialState,
            filteredDevices: obj.euDevices,
            devices: obj.euDevices
        };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the error.deviceList prop for fetchDevicesError", () => {
        const errorObj = new Error("unable to fetch devices");
        const action = fetchDevicesError(errorObj);
        const targetVal: DeviceState = {
            ...obj.initialState,
            errors: {
                deviceList: errorObj.message,
                availabilityList: ""
            }
        };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the isAvaliableDevicesLoading to true for fetchAvailability", () => {
        const action = fetchAvailability();
        const targetVal: DeviceState = { ...obj.initialState, isAvaliableDevicesLoading: true };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the availableDevices and filtered devices for fetchAvailabilitySuccess", () => {
        const action = fetchAvailabilitySuccess(obj.euAvailability);
        const targetVal: DeviceState = {
            ...obj.initialState,
            availableDevices: obj.euAvailability
        };

        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the error.availabilityList prop for fetchAvailabilityError", () => {
        const errorObj = new Error("unable to fetch Availability");
        const action = fetchAvailabilityError(errorObj);
        const targetVal: DeviceState = {
            ...obj.initialState,
            errors: {
                deviceList: "",
                availabilityList: errorObj.message
            }
        };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the osFilterKey and filteredevices prop for filterDevicesByOs Android", () => {
        const action = filterDevicesByOs("Android");
        const targetVal: DeviceState = {
            ...obj.initialState,
            osFilterKey: "Android",
            filteredDevices: obj.euDevices,
            devices: obj.euDevices
        };
        expect(
            DeviceReducer({ ...obj.initialState, devices: obj.euDevices }, action)
        ).toEqual(targetVal);
    });

    it("should update the osFilterKey and filteredevices prop for filterDevicesByOs iOS", () => {
        const action = filterDevicesByOs("iOS");
        const targetVal: DeviceState = {
            ...obj.initialState,
            osFilterKey: "iOS",
            devices: obj.euDevices
        };
        expect(
            DeviceReducer({ ...obj.initialState, devices: obj.euDevices }, action)
        ).toEqual(targetVal);
    });

    it("should update the formFactorFilterKey and filteredevices prop for filterDevicesByFormFactor Phone", () => {
        const action = filterDevicesByFormFactor("Phone");
        const targetVal: DeviceState = {
            ...obj.initialState,
            formFactorFilterKey: "Phone",
            devices: obj.euDevices,
            filteredDevices: obj.euDevices
        };
        expect(
            DeviceReducer({ ...obj.initialState, devices: obj.euDevices }, action)
        ).toEqual(targetVal);
    });

    it("should update the formFactorFilterKey and filteredevices prop for filterDevicesByFormFactor Tablet", () => {
        const action = filterDevicesByFormFactor("Tablet");
        const targetVal: DeviceState = {
            ...obj.initialState,
            formFactorFilterKey: "Tablet",
            devices: obj.euDevices,
            filteredDevices: []
        };
        expect(
            DeviceReducer({ ...obj.initialState, devices: obj.euDevices }, action)
        ).toEqual(targetVal);
    });

    it("should update the availabilityFilterKey and filteredevices prop for filterDevicesByAvailability Available", () => {
        const action = filterDevicesByAvailability("Available");
        const targetVal: DeviceState = {
            ...obj.initialState,
            availabilityFilterKey: "Available",
            devices: obj.euDevices,
            filteredDevices: [obj.euDevices[0]]
        };
        expect(
            DeviceReducer({ ...obj.initialState, devices: obj.euDevices }, action)
        ).toEqual(targetVal);
    });

    it("should update the availabilityFilterKey and filteredevices prop for filterDevicesByAvailability Not Available", () => {
        const action = filterDevicesByAvailability("Not Available");
        const targetVal: DeviceState = {
            ...obj.initialState,
            availabilityFilterKey: "Not Available",
            devices: obj.euDevices,
            filteredDevices: [obj.euDevices[1]]
        };
        expect(
            DeviceReducer({ ...obj.initialState, devices: obj.euDevices }, action)
        ).toEqual(targetVal);
    });

    it("should update the region prop for updateRegion ue", () => {
        const action = updateRegion("eu");
        const targetVal: DeviceState = {
            ...obj.initialState,
            region: "eu"
        };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });

    it("should update the region prop for updateRegion us", () => {
        const action = updateRegion("us");
        const targetVal: DeviceState = {
            ...obj.initialState,
            region: "us"
        };
        expect(
            DeviceReducer(obj.initialState, action)
        ).toEqual(targetVal);
    });





});