import { Constants } from "./constants";

export type AvaibilityType = typeof Constants.availabilityFilters[number];
export type OSType = typeof Constants.osFilters[number];
export type FormFactorType = typeof Constants.formFactorFilters[number];
export type RegionType = typeof Constants.regions[number];

export type DeviceInfo = {
    id: string;
    abiType: string;
    apiLevel: number;
    cloudType: string;
    compositeId: string;
    connectivity: string[];
    cpuType: string;
    cpuCores: number;
    cpuFrequency: number;
    dataCenterId: string;
    descriptorId: string;
    dpi: number;
    dpiName: string;
    freeOfCharge: boolean;
    formFactor: string;
    hasOnScreenButtons: boolean;
    includedInPlan: boolean;
    internalStorageSize: number;
    manufacturers: string[];
    modelNumber: string;
    name: string;
    os: string;
    osVersion: string;
    ramSize: number;
    resolutionHeight: number;
    resolutionWidth: number;
    screenSize: number;
    supportsAppiumWebAppTesting: boolean;
    supportsQualityReport: boolean;
    availability?: AvaibilityType;
};