import React, { useEffect, useState } from "react";
import { View,Text,FlatList,Image,TouchableOpacity,ActivityIndicator,StyleSheet,} from "react-native";
import { getCoins } from "../api/api";
import type { CoinData } from "../types/Coin";
import type { Filters } from "../types/Filter";
import Checkbox from "expo-checkbox";
import { useFavorites } from "../Context/FavoritesContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation/AppNavigator';

interface Props {
    coins: CoinData[];
    sortField: "default" | "price" | "alpha" | "volume" | "change24h";
}

export default function HomeTrendTable({coins, sortField }: Props) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    let processedCoins = [...coins];

    if (sortField === "default") {
        processedCoins.sort((a, b) => {
            const A = a.price_change_percentage_24h ?? 0;
            const B = b.price_change_percentage_24h ?? 0;
            return B - A;
        });
    }

    //filtro
    const visibleCoins = processedCoins.filter(
        (c) => (c as any).coin_id || c.id || (c as any)._id
    );

    const totalPages = Math.ceil(visibleCoins.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCoins = visibleCoins.slice(startIndex, startIndex + itemsPerPage);

    // renderizando a moeda
    const renderCoin = ({ item }: { item: CoinData }) => {
        const coinId = (item as any).coin_id ?? item.id ?? "";
        if (!coinId) return null;

        return (
            <TouchableOpacity
                style={styles.coinContainer}
                onPress={() => navigation.navigate("Coin_Screen", { coinId })}
            >
                <View style={styles.coinRow}>
                    <Checkbox
                        value={coinId !== "" && isFavorite(coinId)}
                        onValueChange={() => {
                            if (coinId !== "") toggleFavorite(coinId);
                        }}
                    />
                    <Text style={styles.rank}>{item.market_cap_rank}</Text>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.coinImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.symbol}>({item.symbol?.toUpperCase()})</Text>
                </View>

                <View style={styles.coinInfo}>
                    <Text style={styles.price}>${item.current_price?.toFixed(2)}</Text>
                    <Text
                        style={[
                            styles.change,
                            {
                                color:
                                    (item.price_change_percentage_24h ?? 0) >= 0
                                        ? "#4CAF50"
                                        : "#F44336",
                            },
                        ]}
                    >
                        {item.price_change_percentage_24h?.toFixed(2)}%
                    </Text>
                    <Text style={styles.marketCap}>
                        MCap: {item.market_cap?.toLocaleString("en-US")}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    //paginaçao
    return (
        <View style={styles.container}>
            <FlatList
                data={currentCoins}
                renderItem={renderCoin}
                keyExtractor={(item, index) => (item.id ?? index).toString()}
            />

            <View style={styles.pagination}>
                <TouchableOpacity
                    onPress={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    style={[styles.pageButton, currentPage === 1 && styles.disabled]}
                >
                    <Text style={styles.pageText}>Anterior</Text>
                </TouchableOpacity>

                <Text style={styles.pageIndicator}>
                    Página {currentPage} / {totalPages}
                </Text>

                <TouchableOpacity
                    onPress={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    style={[styles.pageButton, currentPage === totalPages && styles.disabled]}
                >
                    <Text style={styles.pageText}>Próxima</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "0D1C3A",
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        color: "#fff",
        marginTop: 10,
    },
    coinContainer: {
        backgroundColor: "#1E1E1E",
        borderRadius: 10,
        padding: 12,
        marginVertical: 6,
    },
    coinRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    coinInfo: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    coinImage: {
        width: 24,
        height: 24,
        marginHorizontal: 6,
    },
    rank: {
        color: "#999",
        width: 30,
        textAlign: "right",
    },
    name: {
        color: "#fff",
        fontWeight: "bold",
    },
    symbol: {
        color: "#888",
        marginLeft: 4,
    },
    price: {
        color: "#fff",
    },
    change: {
        fontWeight: "bold",
    },
    marketCap: {
        color: "#aaa",
        fontSize: 12,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
    },
    pageButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#333",
        borderRadius: 6,
    },
    pageText: {
        color: "#fff",
    },
    disabled: {
        opacity: 0.4,
    },
    pageIndicator: {
        color: "#fff",
    },
});