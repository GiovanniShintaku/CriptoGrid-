import "../styles/global.css";
import "../styles/Header.css";
import "../styles/Profile.css";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import type { CoinData } from "@/types/coin";
import Pagination from "@/components/Pagination";

type CoinListProps = {
    coins?: CoinData[];
};

export default function ProfileCoinGrid({ coins: allCoins = [] }: CoinListProps) {
    const { favorites, toggleFavorite } = useFavorites();

    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [sortField, setSortField] = useState<string>("price");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Paginação
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    // Fonte de dados: diretamente os favoritos (array de CoinData) vindos do contexto
    
    const favoriteCoins: CoinData[] = favorites ?? [];

    // Função pura para ordenar a lista
    function sortCoins(coins: CoinData[], field: string, direction: "asc" | "desc") {
        return [...coins].sort((a, b) => {
            let aValue: number | string = 0;
            let bValue: number | string = 0;

            switch (field) {
                case "name":
                    aValue = a.name ?? "";
                    bValue = b.name ?? "";
                    break;
                case "volume":
                    aValue = a.total_volume ?? 0;
                    bValue = b.total_volume ?? 0;
                    break;
                case "marketCap":
                    aValue = a.market_cap ?? 0;
                    bValue = b.market_cap ?? 0;
                    break;
                case "price":
                default:
                    aValue = a.current_price ?? 0;
                    bValue = b.current_price ?? 0;
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return direction === "asc"
                    ? (aValue as string).localeCompare(bValue as string)
                    : (bValue as string).localeCompare(aValue as string);
            } else {
                return direction === "asc"
                    ? (aValue as number) - (bValue as number)
                    : (bValue as number) - (aValue as number);
            }
        });
    }

    const sortedCoins = useMemo(() => {
        return sortCoins(favoriteCoins, sortField, order);
    }, [favoriteCoins, sortField, order]);

    if (!sortedCoins || sortedCoins.length === 0) {
        return <p className="textNoFav">⭐ Nenhuma moeda adicionada aos favoritos.</p>;
    }

    // handler de paginação 
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <h3>Ordenar por:</h3>

            <div className="GridTop">
                <button className="btn" onClick={() => setSortField("price")}>Price</button>
                <button className="btn" onClick={() => setSortField("name")}>Alphabetic</button>
                <button className="btn" onClick={() => setSortField("volume")}>Volume</button>
                <button className="btn" onClick={() => setSortField("marketCap")}>Market Cap</button>

                <div className="dropDown">
                    <button className="btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Order: {order === "asc" ? "⬆️ Crescente" : "⬇️ Decrescente"}
                    </button>

                    {dropdownOpen && (
                        <div className="dropDownContent">
                            <button className="btn" onClick={() => setOrder("asc")}>⬆️ Crescente</button>
                            <button className="btn" onClick={() => setOrder("desc")}>⬇️ Decrescente</button>
                        </div>
                    )}
                </div>
            </div>

           
            <Pagination
                items={sortedCoins}
                itemsPerPage={itemsPerPage}
                renderItems={(visibleCoins) => (
                    <div className="Grid">
                        {visibleCoins.map((coin) => {
                            const coinId = (coin as any).coin_id ?? coin.id ?? "";
                            if (!coinId) return null;

                            return (
                                <div
                                    key={coinId}
                                    className="gridItem"
                                   
                                >
                                   
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        onChange={() => toggleFavorite(coin)}
                                        className="checkbox"
                                    />

                                   
                                    <Link to={`/coin/${coinId}`} className="nav-btn home-inline profileItem" style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
                                        <ul>
                                            <li >
                                                <img
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    width={24}
                                                    style={{ verticalAlign: "middle", marginRight: 5 }}
                                                />
                                                <strong>{coin.name}</strong> <span> ({coin.symbol}) </span>
                                                <span> ${coin.current_price?.toFixed(2)} </span>
                                                <span> {coin.price_change_percentage_24h}% </span>
                                                <span> {coin.total_volume?.toLocaleString()} </span>
                                            </li>
                                        </ul>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            />

            <aside>
                <div className="GridLeft">
                    <button className="side-btn"> Filtros </button>
                    <button className="side-btn"> Recomendados </button>
                </div>
            </aside>
        </div>
    );
}
