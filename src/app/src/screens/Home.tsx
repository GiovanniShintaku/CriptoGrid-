import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeCoinTable from "../components/Home_Table_Relevantes";
import HomeTrendTable from "../components/Home_Table_Tendencia";
import React, { useEffect, useState } from "react";
import { Filters } from "../types/Filter";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { getCoins } from "../api/api";
import { CoinData } from "@/types/Coin";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"relevancia" | "tendencia">("relevancia");
  const [data, setData] = useState<CoinData[]>([]);
  const [sortedData, setSortedData] = useState<CoinData[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<"default" | "price" | "alpha" | "volume" | "change24h">("default");

  const [filters, setFilters] = useState<Filters>({
    name: "",
    minPrice: "",
    maxPrice: "",
    min24h: "",
    max24h: "",
    sortOrder: "asc",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const list = await getCoins();
        setData(list);
        setSortedData(list);
      } catch (err) {}
    };
    load();
  }, []);

  function toggleOrder() {
    setOrder(order === "asc" ? "desc" : "asc");
  }

  function sortBy(field: keyof CoinData) {
    const sorted = [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    setSortedData(sorted);
  }

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />

      <View style={styles.tabButtons}>
        <TouchableOpacity
          testID="tab-relevancia"
          onPress={() => {
            setActiveTab("relevancia");
            setSortField("default");
          }}
        >
          <Text style={styles.tabText}>Relevância</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="tab-tendencia"
          onPress={() => setActiveTab("tendencia")}
        >
          <Text style={styles.tabText}>Tendência</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "relevancia" ? (
          <HomeCoinTable coins={sortedData} />
        ) : (
          <HomeTrendTable coins={sortedData} sortField={sortField} />
        )}
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "0D1C3A" },
  tabButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  tabText: { color: "#fff", fontSize: 18 },
  content: { flex: 1, alignItems: "center" },
});