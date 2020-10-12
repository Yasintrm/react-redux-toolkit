import React from "react";
import Header from "./Header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {

    it("should render", () => {
        render(<Header/>);
        expect(screen.getByTestId("headercomponent")).toBeInTheDocument();
    });
});

