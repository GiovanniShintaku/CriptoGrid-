import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import type { CoinData } from "../src/types/Coin";

// 1. MOCK SEMPRE ANTES DO COMPONENTE
jest.mock("../src/api/api", () => ({
  getCoins: jest.fn(),
}));

import { getCoins } from "../src/api/api";
import SearchBar from "../src/components/SearchBar";

// ---- MOCK DATA ----
const mockCoins: CoinData[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "",
    current_price: 50000,
    market_cap: 1000000000,
    market_cap_rank: 1,
    total_volume: 50000000,
    price_change_percentage_24h: 2.5,
    last_updated: "2024-01-01T00:00:00Z",
  },
];

(getCoins as jest.Mock).mockResolvedValue(mockCoins);

describe("SearchBar", () => {
  it("mostra sugestões quando o usuário digita", async () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar />);

    const input = getByPlaceholderText("Buscar moeda");

    fireEvent.changeText(input, "bit");

    // aguarda debounce + fetch + render
    const item = await waitFor(() => getByText("Bitcoin"), { timeout: 1500 });

    expect(item).toBeTruthy();
  });
});