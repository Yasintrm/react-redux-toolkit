import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { RegionSelector } from "./RegionSelector";


describe("RegionSelector Component", () => {

    it("should render", async () => {
        
        render(
            <Provider store={store}>
                <RegionSelector/>
            </Provider>
        );
        expect(screen.getByTestId("regionselectorcomponent")).toBeInTheDocument();
    });
});

