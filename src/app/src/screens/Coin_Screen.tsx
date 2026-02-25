import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "../Navigation/AppNavigator";

import { getCoins, getCoinHistory } from "../api/api";
import type { CoinData, OHLCData } from "../types/Coin";
import HeaderCoin from "../components/HeaderCoin";
import Chart from "../components/Chart";


type CoinScreenRouteProp = RouteProp<RootStackParamList, "Coin_Screen">;

export default function Coin_Screen() {
  const route = useRoute<CoinScreenRouteProp>();
  const { coinId } = route.params;

  const [coin, setCoin] = useState<any>(null);
  const [loadingCoin, setLoadingCoin] = useState(true);

  const [selectedRange, setSelectedRange] = useState("30d");
  
  const [history, setHistory] = useState<OHLCData[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Carrega dados básicos da moeda
  useEffect(() => {
    const loadCoin = async () => {
      try {
        const list = await getCoins();
        const found = list.find((c) => c.id === coinId || c.coin_id === coinId);
        setCoin(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCoin(false);
      }
    };

    loadCoin();
  }, [coinId]);

  // Carrega histórico para o gráfico
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoadingHistory(true);
        
        const histCoins: CoinData[] = await getCoinHistory(coinId, selectedRange);
      const ohlcPoints: OHLCData[] = histCoins.flatMap((c) => c.ohlc ?? []);

      setHistory(ohlcPoints);

      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
        setHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistory();
  }, [coinId, selectedRange]);

  if (loadingCoin || !coin)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FFB2" />
      </View>
    );

  return (
    <View style={styles.container}>
      <HeaderCoin />

      <View style={styles.coinHeader}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <Text testID="coin-title" style={styles.title}>{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
      </View>

      <Text style={styles.price}>${coin.current_price?.toFixed(2)}</Text>

      <View style={styles.rangeContainer}>
        {["1d", "7d", "30d", "90d", "1y"].map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setSelectedRange(r)}
            style={[
              styles.rangeButton,
              selectedRange === r && styles.rangeActive,
            ]}
          >
            <Text style={styles.rangeText}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartBox}>
        {loadingHistory ? (
          <ActivityIndicator size="small" color="#00FFB2" />
        ) : (
          <Chart data={history} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  coinHeader: { alignItems: "center", marginTop: 10 },
  image: { width: 60, height: 60 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 8 },
  symbol: { color: "#aaa", fontSize: 16 },

  price: {
    color: "#00FFB2",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },
  rangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#1E1E1E",
  },
  rangeActive: {
    backgroundColor: "#00FFB2",
  },
  rangeText: { color: "#fff" },

  chartBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#1a1a1a",
    marginHorizontal: 20,
    borderRadius: 12,
  },
});
