import React, { useEffect, useState, useMemo } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../Navigation/AppNavigator";
import { getCoins } from "../api/api";
import { CoinData } from "@/types/Coin";
import { useFavorites } from "../Context/FavoritesContext";

export default function ProfileCoinGrid() {
    const [data, setData] = useState<CoinData[]>([]);
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { isFavorite, toggleFavorite, favorites } = useFavorites();

    useEffect(() => {
        const load = async () => {
            try {
                const list = await getCoins();
                setData(list);
            } catch (err) {
                console.error("Erro ao carregar moedas:", err);
            }
        };

        load();
    }, []);

    function toggleOrder() {
        setOrder((s) => (s === "asc" ? "desc" : "asc"));
    }

    function sortBy(field: keyof CoinData) {
        const sorted = [...data].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];

            if (typeof aVal === "string" && typeof bVal === "string") {
                return order === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }

            if (typeof aVal === "number" && typeof bVal === "number") {
                return order === "asc" ? aVal - bVal : bVal - aVal;
            }

            return 0;
        });

        setData(sorted);
        setCurrentPage(1);
    }

    // Filtra apenas as moedas que estão em favorites (usa id ou coin_id)
    const filteredData = useMemo(() => {
        if (!favorites || favorites.length === 0) return [];
        return data.filter((c) => {
            const id = c.id ?? c.coin_id ?? "";
            return id !== "" && favorites.includes(id);
        });
    }, [data, favorites]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage]);

    // renderItem: coinId é declarado AQUI e utilizado SOMENTE dentro deste bloco
    function renderItem({ item }: { item: CoinData }) {
        const coinId = (item.id ?? item.coin_id ?? "").toString();

        // caso não exista coinId, retornamos null (proteção)
        if (!coinId) return null;

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Coin_Screen", { coinId })}
            >
                <Checkbox
                    value={isFavorite(coinId)}
                    onValueChange={() => {
                        toggleFavorite(coinId);
                        
                        setCurrentPage(1);
                    }}
                />

                <Image source={{ uri: item.image }} style={styles.img} />
                <View>
                    <Text style={styles.name}>
                        {item.name} ({item.symbol})
                    </Text>
                    <Text style={styles.info}>💰 ${item.current_price?.toFixed(2)}</Text>
                    <Text style={styles.info}>📊 {item.price_change_percentage_24h}%</Text>
                    <Text style={styles.info}>📈 {item.total_volume?.toLocaleString() ?? "N/A"}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Ordenar por:</Text>

                <TouchableOpacity style={styles.btn} onPress={() => sortBy("current_price")}>
                    <Text style={styles.btnText}>Preço</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => sortBy("name")}>
                    <Text style={styles.btnText}>Alfabética</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => sortBy("total_volume")}>
                    <Text style={styles.btnText}>Volume</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={toggleOrder}>
                    <Text style={styles.btnText}>{order === "asc" ? "⬆️" : "⬇️"}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={paginatedData}
                keyExtractor={(item, index) => (item.id ?? item.coin_id ?? index).toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={renderItem}
            />

            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[styles.pageBtn, currentPage === 1 && styles.disabled]}
                    disabled={currentPage === 1}
                    onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                    <Text style={styles.pageText}>Anterior</Text>
                </TouchableOpacity>

                <Text style={styles.pageIndicator}>
                    {currentPage} / {totalPages}
                </Text>

                <TouchableOpacity
                    style={[styles.pageBtn, currentPage === totalPages && styles.disabled]}
                    disabled={currentPage === totalPages}
                    onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                    <Text style={styles.pageText}>Próxima</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "0D1C3A",
        flex: 1,
        padding: 16,
    },
    top: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 10,
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 18,
        width: "100%",
    },
    btn: {
        backgroundColor: "#111",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    btnText: {
        color: "#fff",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#111",
        padding: 12,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: "center",
        gap: 10,
    },
    img: {
        width: 40,
        height: 40,
    },
    name: {
        color: "#fff",
        fontSize: 16,
    },
    info: {
        color: "#aaa",
        fontSize: 14,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        backgroundColor: "#000",
    },
    pageBtn: {
        backgroundColor: "#111",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    disabled: {
        opacity: 0.4,
    },
    pageText: {
        color: "#fff",
        fontSize: 14,
    },
    pageIndicator: {
        color: "#fff",
        fontSize: 16,
        paddingTop: 6,
    },
});


/*

PARTE INACABADA DE OUTRO INTEGRANTE

import "../styles/global.css";
import "../styles/Header.css";
import "../styles/Profile.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CoinData } from "../types/Coin";
import { getCoins } from "../api/api";

type CoinListProps = {
    
    coins?: CoinData[];
};

export default function ProfileCoinGrid({ coins: initialCoins }: CoinListProps) {
    const [coins, setCoins] = useState<CoinData[]>(initialCoins ?? []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    //chama a api
    useEffect(() => {
        async function fetchCoins() {
            try {
                const data = await getCoins();
                setCoins(data);
            } catch (err) {
                console.error("Erro ao carregar moedas:", err);
                setError("Erro ao carregar moedas.");
            } finally {
                setLoading(false);
            }
        }

        fetchCoins();
    }, []);

    function toggleOrder() {
        setOrder(order === "asc" ? "desc" : "asc");
    }

    function sortByName() {
        const sorted = [...coins].sort((a, b) => {
            return order === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
        setCoins(sorted);
    }

    function sortByPrice() {
        const sorted = [...coins].sort((a, b) => {
            const priceA = a.current_price ?? 0;
            const priceB = b.current_price ?? 0;
            return order === "asc" ? priceA - priceB : priceB - priceA;
        });
        setCoins(sorted);
    }

    function sortByVolume() {
        const sorted = [...coins].sort((a, b) => {
            const volA = a.total_volume ?? 0;
            const volB = b.total_volume ?? 0;
            return order === "asc" ? volA - volB : volB - volA;
        });
        setCoins(sorted);
    }

    function sortByChange24h() {
        const sorted = [...coins].sort((a, b) => {
            const changeA = a.price_change_percentage_24h ?? 0;
            const changeB = b.price_change_percentage_24h ?? 0;
            return order === "asc" ? changeA - changeB : changeB - changeA;
        });
        setCoins(sorted);
    }


    if (loading) return <p>Carregando moedas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="GridTop">
                <h3>Ordenar por:</h3>
                <button className="btn" onClick={ sortByPrice }> Price </button>
                <button className="btn" onClick={sortByName}> Alphabetic </button>
                <button className="btn" onClick={sortByVolume}> Volume </button>
                <button className="btn" onClick={sortByChange24h}> Market cap </button>
                <button className="btn" onClick={toggleOrder}> Ordem </button>
                   <div className="dropDownContent">
                        Ordem: {order === "asc" ? "⬆️ Crescente" : "⬇️ Decrescente"}
                   </div>
                
                <div className="addBtn">
                    <h3> Adicionar Moeda </h3>
                    <button> + </button>
                </div>
            </div>

            <div className="Grid">
                {coins.map((coin) => {
                    const coinId = (coin as any).coin_id ?? coin.id ?? "";
                    if (!coinId) return null;

                    return (
                        <Link to={`/coin/${coinId}`} className="nav-btn home-inline" key={coinId}>
                            <ul>
                                <li>
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        width={24}
                                        style={{ verticalAlign: "middle", marginRight: 5 }}
                                    />
                                    <strong>{coin.name}</strong> ({coin.symbol}) — $
                                    {coin.current_price?.toFixed(2)} — {coin.price_change_percentage_24h}% —{" "}
                                    {coin.total_volume?.toLocaleString()}
                                </li>
                            </ul>
                        </Link>
                    );
                })}
            </div>

            <aside>
                <div className="GridLeft">
                    <button> Filtros </button>
                    <button> Recomendados </button>
                </div>
            </aside>
        </div>
    );
}
*/