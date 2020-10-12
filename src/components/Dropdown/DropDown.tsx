import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import "./DropDown.scss";

export type DropdownItem = {
    key: string;
    value: string;
    label: string;
};

export type DropDownProps = {
    title: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    values: DropdownItem[];
}

export const DropDown: React.FunctionComponent<DropDownProps> = props => {
    const isLoading = useSelector((state: AppState) => state.device.isDeviceLoading);
    return (
        <>
            <div className="select-container" >
                <div>{props.title}</div>
                <div>
                    <select data-testid="dropdowncomponent" onChange={props.onChange} disabled={isLoading}>
                        {props.values.map(item => (<option key={item.key} value={item.value}>{item.label}</option>))}
                    </select>
                </div>
            </div>
        </>
    );
};