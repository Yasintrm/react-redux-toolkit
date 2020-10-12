import { DeviceInfo } from "../src/features/device/deviceInfo";
import { DeviceState } from "../src/features/device/deviceSlice";

const euDevices: DeviceInfo[] = [{
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
    "availability": "Available"
}];

const avaibility: string[] = [
    "BQ_Aquaris_X2_real",
    "iPad_mini_2_11_real",
    "iPad_Air_12_real",
    "iPad_mini_16GB_real",
    "iPhone_6_16GB_real",
    "Samsung_Galaxy_S8_real"
];

export const mockData = () => {
    const initialState: DeviceState = {
        availabilityFilterKey: "All",
        availableDevices: [],
        devices: euDevices,
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

    return {
        initialState,
        eu: {
            devices: [...euDevices],
            avaibility: [...avaibility]
        },
        us: {
            devices: [...euDevices],
            avaibility: [...avaibility]
        }
    };
};