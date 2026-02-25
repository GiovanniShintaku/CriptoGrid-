import React from "react";
import { render } from "@testing-library/react-native";
import GraficoCandles from "../src/components/GraficoCandles.test";

describe("GraficoCandles", () => {
  const mockCandles = [
    { t: 1, o: 10, h: 12, l: 9, c: 11 },
    { t: 2, o: 11, h: 15, l: 10, c: 14 },
    { t: 3, o: 14, h: 18, l: 13, c: 17 },
  ];

  it("renderiza o gráfico com o title correto", () => {
    const { getByTestId } = render(
      <GraficoCandles data={mockCandles} timeframe="7d" />
    );

    expect(getByTestId("chart-title").children[0])
      .toBe("Gráfico (7d)");
  });

  it("renderiza todos os candles recebidos", () => {
    const { getAllByTestId } = render(
      <GraficoCandles data={mockCandles} timeframe="7d" />
    );

    const candles = getAllByTestId("candle-item");
    expect(candles.length).toBe(mockCandles.length);
  });

  it("renderiza valores OHLC corretamente", () => {
    const { getByLabelText } = render(
      <GraficoCandles data={mockCandles} timeframe="7d" />
    );

    const candle0 = getByLabelText("candle-0");
    expect(candle0.children[0]).toContain("O:10");
    expect(candle0.children[0]).toContain("H:12");
    expect(candle0.children[0]).toContain("L:9");
    expect(candle0.children[0]).toContain("C:11");
  });

  it("atualiza o gráfico ao trocar timeframe", () => {
    const { getByTestId, rerender } = render(
      <GraficoCandles data={mockCandles} timeframe="7d" />
    );

    expect(getByTestId("chart-title").children[0])
      .toBe("Gráfico (7d)");

    rerender(
      <GraficoCandles data={mockCandles} timeframe="1y" />
    );

    expect(getByTestId("chart-title").children[0])
      .toBe("Gráfico (1y)");
  });
});
