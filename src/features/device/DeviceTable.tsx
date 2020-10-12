import React from "react";
import { useDispatch } from "react-redux";
import { DropDown } from "../../components/Dropdown/DropDown";
import { RegionSelector } from "../../components/RegionSelector/RegionSelector";
import { buildDrowDownItemsFromArray } from "../../utils";
import { Constants } from "./constants";
import { DeviceInfo, OSType, AvaibilityType, FormFactorType } from "./deviceInfo";
import { actions } from "./deviceSlice";

import "./DeviceTable.scss";
import { useDevice } from "./useDevice";

type HeaderCell = Pick<DeviceInfo, "name" | "os" | "osVersion" | "descriptorId" | "formFactor" | "screenSize" | "ramSize" | "modelNumber" | "availability">;

type HeaderInfo = {
    label: string;
    key: keyof HeaderCell;
    align: "left" | "center" | "right";
};

const headers =
    [
        { label: "Name", align: "left", key: "name" },
        { label: "Model Number", align: "left", key: "modelNumber" },
        { label: "OS", align: "left", key: "os" },
        { label: "OS Version", align: "right", key: "osVersion" },
        { label: "Ram Size", align: "right", key: "ramSize" },
        { label: "Screen Size", align: "right", key: "screenSize" },
        { label: "Form Factor", align: "left", key: "formFactor" },
        { label: "Availability", align: "left", key: "availability" }
    ] as HeaderInfo[];

const TableHeader = () => {

    const dispatch = useDispatch();

    const onOSTypeFilterChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(actions.filterDevicesByOs(event.target.value as OSType));
    };

    const onAvailabilityFilterChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(actions.filterDevicesByAvailability(event.target.value as AvaibilityType));
    };

    const onFormFactorFilterChanged = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(actions.filterDevicesByFormFactor(event.target.value as FormFactorType));
    };

    const osSelectFilters = React.useMemo(() => buildDrowDownItemsFromArray(Constants.osFilters), []);
    const availabilityFilters = React.useMemo(() => buildDrowDownItemsFromArray(Constants.availabilityFilters), []);
    const formFactorFilters = React.useMemo(() => buildDrowDownItemsFromArray(Constants.formFactorFilters), []);

    const getHeaderByKey = (header: HeaderInfo) => {
        switch (header.key) {
            case "os": {
                return (<DropDown title="OS" values={osSelectFilters} onChange={onOSTypeFilterChanged} />);
            }
            case "availability": {
                return (<DropDown title="Availability" values={availabilityFilters} onChange={onAvailabilityFilterChanged} />);
            }
            case "formFactor": {
                return (<DropDown title="Form Factor" values={formFactorFilters} onChange={onFormFactorFilterChanged} />);
            }
            default: {
                return (<div>{header.label}</div>);
            }
        }
    };

    return (
        <thead>
            <tr>
                <th align="right" className="index-col">Index</th>
                <th className="imgcell">Product Image</th>
                {headers.map(header => <th align={header.align} key={header.key}>{getHeaderByKey(header)}</th>)}
            </tr>
        </thead>
    );
};

const TableBody = () => {
    const { deviceList } = useDevice();


    const onImageLoadError = (event: any): void => {
        event.target.onError = null;
        event.target.src = Constants.brokenImageUrl;
    }

    return (
        <>
            <tbody data-testid="devicebody">
                {
                    deviceList.map((row, idx) =>
                        (<tr key={row.id}>
                            <td align="right" className="index-col">{idx + 1}</td>
                            <td align="center" className="imgcell">
                                <img onError={onImageLoadError}
                                    className="responsive"
                                    src={Constants.buildImageUrlFromDescriptorId(row["descriptorId"])}>
                                </img>
                            </td>
                            {headers.map(header => <td key={row.id + "_" + header.key} align={header.align}>{row[header.key]}</td>)}
                        </tr>)
                    )
                }
            </tbody>

        </>);
};

export const DeviceTable = () => {
    const { deviceIsLoading, deviceRegion, deviceSummaryInfo } = useDevice();
    return (
        <>
            <div className="tablecontainer" data-test="devicetableComponent">

                <table cellSpacing="0">
                    <caption className="table-header">
                        <span data-testid="tableheader">
                            {deviceIsLoading ? "Please Wait..." : (deviceRegion.toUpperCase() + " Devices")}
                        </span>
                    </caption>
                    <TableHeader />
                    <TableBody />
                </table>
            </div>
            <div className="footer-message">
                <div className="child region-container">
                    <RegionSelector />
                </div>
                <div className="child message-container">{deviceSummaryInfo}</div>
            </div>
        </>
    );
};
