import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AppNavigator from "../src/Navigation/AppNavigator";
import * as api from "../src/api/api";

jest.mock("../src/api/api");

const mockData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "https://test.com/btc.png",
    current_price: 30000,
    price_change_percentage_24h: 2.5,
    market_cap_rank: 1,
    market_cap: 500000000,
  },
];

(api.getCoins as jest.Mock).mockResolvedValue(mockData);

describe("App navegação", () => {
  it("navega até Coin_Screen e renderiza detalhes", async () => {
    const { getByTestId, getAllByTestId } = render(<AppNavigator />);

    fireEvent.press(getByTestId("tab-relevancia"));

    const items = await waitFor(() => getAllByTestId("coin-item"));

    fireEvent.press(items[0]);

    await waitFor(() => getByTestId("coin-title"));
  });
});