import React, { useState } from "react";
import { getCoinHistory } from "@/api/api";
import type { OHLCData } from "@/types/coin";

interface FiltroDataGraficoProps {
  coinId: string;
}

const FiltroData_Grafico: React.FC<FiltroDataGraficoProps> = ({ coinId }) => {
  const [timeframe, setTimeframe] = useState("7d");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OHLCData[]>([]);

  const timeframes = ["24h", "7d", "30d", "3m", "1y"];

  const handleSelect = async (selected: string) => {
    if (loading) return;
    setTimeframe(selected);
    setLoading(true);

    try {
      const result = await getCoinHistory(coinId, selected);
      setData(result.flatMap((coin: any) => coin.ohlc || []));
    } catch (error) {
      console.error("❌ Erro ao buscar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center mt-6">
      <div
        className="flex items-center justify-center rounded-full shadow-inner"
        style={{
          background: "var(--panel)",
          padding: "6px",
          gap: "4px",
          fontFamily: "var(--font-body)", 
          borderRadius: "0.5rem",
        }}
      >
        {timeframes.map((tf) => {
          const active = timeframe === tf;
          return (
            <button
              key={tf}
              onClick={() => handleSelect(tf)}
              disabled={loading}
              className="transition-all duration-200"
              style={{
                color: active ? "#fff" : "var(--muted)",
                background: active
                  ? "color-mix(in oklab, var(--accent-pink) 18%, transparent)"
                  : "transparent",
                borderRadius: "999px",
                padding: "8px 22px",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {tf}
            </button>
          );
        })}
      </div>

      {loading ? (
        <p
          className="mt-4 text-center animate-pulse"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          ⏳ Carregando...
        </p>
      ) : data.length > 0 ? (
        <p
          className="mt-4 text-center text-sm"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          {data.length} candles carregados ({timeframe})
        </p>
      ) : (
        <p
          className="mt-4 text-center text-sm"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Nenhum dado carregado ainda.
        </p>
      )}
    </section>
  );
};

export default FiltroData_Grafico;