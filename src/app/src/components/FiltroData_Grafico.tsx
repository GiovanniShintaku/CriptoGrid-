import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getCoinHistory } from "../api/api";
import type { OHLCData } from "../types/Coin";

interface Props {
  coinId: string;
  onDataLoaded: (data: OHLCData[], timeframe: string) => void; 
}

export default function FiltroData_Grafico({ coinId, onDataLoaded }: Props) {
  const [timeframe, setTimeframe] = useState("7d");
  const [loading, setLoading] = useState(false);

  const timeframes = ["24h", "7d", "30d", "3m", "1y"];

  const handleSelect = async (tf: string) => {
    if (loading) return;

    setTimeframe(tf);
    setLoading(true);

    try {
      const result = await getCoinHistory(coinId, tf);
      const candles = result.flatMap((coin: any) => coin.ohlc || []);

      onDataLoaded(candles, tf);
    } catch (e) {
      console.error("Erro ao buscar candles:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {timeframes.map((tf) => {
          const active = timeframe === tf;
          return (
            <TouchableOpacity
              key={tf}
              style={[styles.btn, active && styles.btnActive]}
              onPress={() => handleSelect(tf)}
              disabled={loading}
            >
              <Text style={[styles.btnText, active && styles.btnTextActive]}>
                {tf}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />
      ) : (
        <Text style={styles.status}>Período selecionado: {timeframe}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 6,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  btnActive: {
    backgroundColor: "#ff3b9d22",
  },
  btnText: {
    color: "#888",
    fontWeight: "600",
  },
  btnTextActive: {
    color: "#fff",
  },
  status: {
    color: "#aaa",
    marginTop: 10,
  },
});