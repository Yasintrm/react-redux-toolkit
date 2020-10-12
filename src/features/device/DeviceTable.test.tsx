import { render, screen, act, waitForElementToBeRemoved, waitForElement } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { mockData } from "../../../mock/index";
import { Provider } from "react-redux";
import { store } from "../../store";
import { DeviceTable } from "./DeviceTable";


describe("DeviceTable Component", () => {
    beforeEach(() => {
        axios.get = jest.fn().mockImplementation((url: string) => {
            switch (url) {
                case "/api/eu-devices.json": {
                    return Promise.resolve({ data: mockData().eu.devices });
                }
                case "/api/eu-availability.json": {
                    return Promise.resolve({ data: mockData().eu.avaibility });
                }
                default: {
                    return Promise.resolve(null);
                }
            }
        });
    });

    afterEach(() => {
        jest.fn().mockClear();
    });


    it("should render 'Please wait' then have items", async () => {

        render(
            <Provider store={store}>
                <DeviceTable />
            </Provider>
        );

        expect(await screen.findByText(/Please Wait.../i)).toBeInTheDocument();
        expect(axios.get).toHaveBeenCalled();
        expect(screen.getByTestId("devicebody").querySelectorAll("tr").length).toBeGreaterThan(0);
    });
});