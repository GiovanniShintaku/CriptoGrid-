import React from "react";
import type { OHLCData } from "@/types/coin";



interface ChartProps {
  data: OHLCData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const width = 800;
  const height = 300;
  const margin = 20;
  const candleWidth = 8;
  const upColor = "#2ecc71";
  const downColor = "#e74c3c";

  const svgChart =
    data && data.length > 0
      ? (() => {
          const prices = data.flatMap((d) => [d.high, d.low, d.open, d.close]);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const innerHeight = Math.max(1, height - margin * 2);
          const innerWidth = Math.max(1, width - margin * 2);

          const priceToY = (p: number) =>
            margin + ((maxPrice - p) / (maxPrice - minPrice || 1)) * innerHeight;

          const step = innerWidth / data.length;
          const ticks = [0, 0.25, 0.5, 0.75, 1];

          return (
            <svg
              width={width}
              height={height}
              role="img"
              aria-label="Candlestick chart"
              className="bg-gray-900 rounded-md"
            >

              {/* andre | eixo de preço */}
              {ticks.map((t) => {
                const y = margin + t * innerHeight;
                const price = (1 - t) * (maxPrice - minPrice) + minPrice;
                return (
                  <g key={t}>
                    {/* andre | linha */}
                    <line
                      x1={margin}
                      x2={width - margin}
                      y1={y}
                      y2={y}
                      stroke="#444"
                      strokeWidth={1}
                    />
                    {/* andre | label do preço */}
                    <text
                      x={width - margin + 6}
                      y={y + 4}
                      fontSize={10}
                      fill="#aaa"
                      aria-hidden="true"
                    >
                      {price.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* andre | velas */}
              {data.map((d, i) => {
                const cx = margin + i * step + step / 2;
                const wickTop = priceToY(d.high);
                const wickBottom = priceToY(d.low);
                const bodyTop = priceToY(Math.max(d.open, d.close));
                const bodyBottom = priceToY(Math.min(d.open, d.close));
                const bodyHeight = Math.max(1, bodyBottom - bodyTop);
                const isUp = d.close >= d.open;
                const fill = isUp ? upColor : downColor;
                const stroke = fill;

                return (
                  <g key={i} transform="translate(0,0)">
                    {/* wick */}
                    <line
                      x1={cx}
                      x2={cx}
                      y1={wickTop}
                      y2={wickBottom}
                      stroke={stroke}
                      strokeWidth={1}
                      strokeLinecap="butt"
                    />
                    {/* andre | body */}
                    <rect
                      x={cx - candleWidth / 2}
                      y={bodyTop}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={fill}
                      stroke={stroke}
                      rx={1}
                      ry={1}
                      role="img"
                      aria-label={`Candle ${i}`}
                    >
                      <title>
                        {new Date((d as any).date).toLocaleString()} — O:{d.open} H:{d.high} L:
                        {d.low} C:{d.close}
                      </title>
                    </rect>
                  </g>
                );
              })}
            </svg>
          );
        })()
      : null;

  return (
    <div className="border rounded-md bg-gray-50 p-4 text-gray-800 text-sm text-center">
      <p className="mb-2 font-semibold">📊 Gráfico de velas (placeholder)</p>
      {data && data.length > 0 ? (
        <>
          <p>{data.length} pontos de dados recebidos</p>
          <pre className="bg-gray-900 text-green-300 text-xs text-left p-2 mt-2 rounded overflow-x-auto">
            {JSON.stringify(data.slice(0, 2), null, 2)}
          </pre>

         
          <div className="mt-4 flex justify-center">{svgChart}</div>
        </>
      ) : (
        <p>Nenhum dado carregado ainda.</p>
      )}
    </div>
  );
};

export default Chart;
