import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { OverviewContainer } from "./OverviewContainer";

describe("OverviewContainer Component", () => {

    it("should render", async () => {
        
        render(
            <Provider store={store}>
                <OverviewContainer/>
            </Provider>
        );
        expect(screen.getByTestId("regionselectorcomponent")).toBeInTheDocument();
    });
});