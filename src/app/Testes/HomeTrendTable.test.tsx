import React from "react";
import { render } from "@testing-library/react-native";
import HomeTrendTable from "../src/components/Home_Table_Tendencia";
import type { Filters } from "../src/types/Filter";

const mockFilters: Filters = {
    name: "",
    minPrice: "",
    maxPrice: "",
    min24h: "",
    max24h: "",
    sortOrder: "asc",
};

describe("HomeTrendTable", () => {
    it("renderiza sem erros", () => {
        render(<HomeTrendTable filters={mockFilters} />);
    });
});