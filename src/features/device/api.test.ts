import moxios from "moxios";
import { store } from "../../store";
import { fetchAvailabilityAsync, fetchDevicesAsync } from "./api";
import { DeviceInfo } from "./deviceInfo";
import { DeviceState } from "./deviceSlice";

describe("fetchDevicesAsync action", () => {
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
                "id": "0",
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
                "id": "1",
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
    
    let obj: ReturnType<typeof setup>;
    beforeEach(() => {
        obj = setup();
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should update devices prop for fetchDevicesAsync", () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: obj.euDevices
            });
        });

        return store.dispatch(fetchDevicesAsync("eu")).then((val) => {
            const newState = store.getState();
            expect(newState.device.devices).toEqual(obj.euDevices);
        });
    });

    it("should update availability prop for fetchAvailabilityAsync", () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: obj.euAvailability
            });
        });

        return store.dispatch(fetchAvailabilityAsync("eu")).then(() => {
            const newState = store.getState();
            expect(newState.device.availableDevices).toEqual(obj.euAvailability);
        });
    });
});