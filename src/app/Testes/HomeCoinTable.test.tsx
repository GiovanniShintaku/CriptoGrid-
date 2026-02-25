import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import HomeCoinTable from "../src/components/Home_Table_Relevantes";
import type { Filters } from "../src/types/Filter";

// ---- MOCK da API ----
jest.mock("../src/api/api", () => ({
    getCoins: jest.fn(),
}));

import { getCoins } from "../src/api/api";

const mockFilters: Filters = {
    name: "",
    minPrice: "",
    maxPrice: "",
    min24h: "",
    max24h: "",
    sortOrder: "asc",
};

describe("HomeCoinTable", () => {
    it("renderiza sem quebrar", async () => {
        // mock resposta da API
        (getCoins as jest.Mock).mockResolvedValue([
            {
                id: "bitcoin",
                name: "Bitcoin",
                symbol: "btc",
                image: "",
                current_price: 50000,
                market_cap: 1000000000,
                market_cap_rank: 1,
                price_change_percentage_24h: 2.5,
            }
        ]);

        const { getByText } = render(<HomeCoinTable filters={mockFilters} />);

        // aguarda carregar
        await waitFor(() => {
            expect(getByText("Bitcoin")).toBeTruthy();
        });
    });
});