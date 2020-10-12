import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Constants } from "../../features/device/constants";
import { buildDrowDownItemsFromArray } from "../../utils";
import { store } from "../../store";
import { DropDownProps, DropDown } from "./DropDown";


describe("DropDown Component", () => {

    it("should render and have items", async () => {
        
        const values = buildDrowDownItemsFromArray(Constants.osFilters);

        const dropDownConfig: DropDownProps = {
            title: "Test1",
            values: values
        };

        render(
            <Provider store={store}>
                <DropDown title={dropDownConfig.title} values={dropDownConfig.values}/>
            </Provider>
        );
        const dropdownComponent = screen.getByTestId("dropdowncomponent");
        expect(dropdownComponent).not.toBeNull();
        expect(dropdownComponent.querySelectorAll("option").length).toBe(values.length);
    });
});

