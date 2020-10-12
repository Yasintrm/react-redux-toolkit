import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegionType } from "../../features/device/deviceInfo";
import { actions } from "../../features/device/deviceSlice";
import { AppState } from "../../store";

export const RegionSelector = () => {
    const dispatch = useDispatch();
    const region = useSelector((state: AppState) => state.device.region);
    const isLoading = useSelector((state: AppState) => state.device.isDeviceLoading);

    const onRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.updateRegion(event.target.value as RegionType));
    };

    return (
        <>
            <label data-testid="regionselectorcomponent">Region</label>
            <input type="radio" name="region" value="eu" onChange={onRegionChange} disabled={isLoading} checked={region === "eu"}></input><span>EU</span>
            <input type="radio" name="region" value="us" onChange={onRegionChange} disabled={isLoading} checked={region === "us"}></input><span>US</span>
        </>
    )
};