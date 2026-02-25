import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Search } from "lucide-react-native";
import { getCoins } from "../api/api";
import type { CoinData } from "../types/Coin";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Navigation/AppNavigator";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CoinData[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCoins = async () => {
      const q = query.trim();
      if (q.length < 2) {
        setSuggestions([]);
        return;
      }

      const coins = await getCoins();
      const filtered = coins
        .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 4);

      setSuggestions(filtered);
    };

    const delay = setTimeout(fetchCoins, 300);
    return () => clearTimeout(delay);
  }, [query]);

  function handleSelect(coinId: string) {
    navigation.navigate("Coin_Screen", { coinId });
    setQuery("");
    setSuggestions([]);
  }

  return (
    <View style={styles.container}>
      <Search size={20} color="#aaa" />
      <TextInput
        style={styles.input}
        placeholder="Buscar moeda"
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
      />

      {suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `${item.id ?? index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item.id ?? "")}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  dropdown: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    zIndex: 20,
  },
  item: {
    padding: 12,
  },
  itemText: {
    color: "#fff",
  },
});