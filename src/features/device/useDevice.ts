import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import { fetchDevicesAsync, fetchAvailabilityAsync } from "./api";
import { Constants } from "./constants";

export const useDevice = () => {
    const region = useSelector((state: AppState) => state.device.region);
    const isLoading = useSelector((state: AppState) => state.device.isDeviceLoading);
    const devices = useSelector((state: AppState) => state.device.filteredDevices);
    const dispatch = useDispatch();

    const [footerMessage, setFooterMessage] = useState("");

    useEffect(() => {
        if (isLoading) {
            setFooterMessage("Fetching...");
            return;
        }
        const msg = devices.length === 0 ? "" : `${devices.length} device${devices.length > 1 ? "s" : ""} found`;
        setFooterMessage(msg);
    }, [setFooterMessage, devices, isLoading]);

    useEffect(() => {

        const fetchAll = () => {
            dispatch(fetchDevicesAsync(region));
            dispatch(fetchAvailabilityAsync(region));
        };

        fetchAll();

        const intervalId = setInterval(() => fetchAll(), Constants.refreshPeriodInSeconds * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [region]);


    return {
        deviceRegion: region,
        deviceIsLoading: isLoading,
        deviceList: devices,
        deviceSummaryInfo: footerMessage
    };
};