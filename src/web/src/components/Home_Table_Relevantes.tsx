import "../styles/global.css";
import "../styles/Header.css";
import "../styles/Profile.css";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getCoins } from "@/api/api";
import type { CoinData } from "@/types/coin";
import type { Filters } from "@/types/filters";
import Pagination from "@/components/Pagination";
import { useFavorites } from "@/context/FavoritesContext";  
import { useAuth } from "@/context/AuthContext";


interface Props {
    filters: Filters;
}



export default function HomeCoinTable({ filters }: Props) {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const { toggleFavorite, isFavorite } = useFavorites();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCoins();

        // Ordem por relevância (ranking de mercado)
        const sorted = [...data].sort(
          (a, b) => (a.market_cap_rank ?? 9999) - (b.market_cap_rank ?? 9999)
        );

        setCoins(sorted);
      } catch (error) {
        console.error("❌ Erro ao carregar moedas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400 animate-pulse mt-10">
        ⏳ Carregando moedas...
      </p>
    );
    }

    const filteredCoins = coins
        .filter((coin) => {
            const nameMatch = coin.name
                .toLowerCase()
                .includes(filters.name.toLowerCase());

            const price = coin.current_price ?? 0;
            const change24h = coin.price_change_percentage_24h ?? 0;


            const priceMatch =
                (!filters.minPrice || price >= parseFloat(filters.minPrice)) &&
                (!filters.maxPrice || price <= parseFloat(filters.maxPrice));

            const change24hMatch =
                (!filters.min24h || change24h >= parseFloat(filters.min24h)) &&
                (!filters.max24h || change24h <= parseFloat(filters.max24h));

            return nameMatch && priceMatch && change24hMatch;
        })
        .sort((a, b) => {
            const mult = filters.sortOrder === "asc" ? 1 : -1;
            return mult * ((a.current_price ?? 0) - (b.current_price ?? 0));
        });


  // Filtra apenas moedas com identificador válido
   const visibleCoins = filteredCoins.filter(
        (c) => (c as any).coin_id || c.id || (c as any)._id
    );

   const totalPages = Math.ceil(visibleCoins.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentCoins = visibleCoins.slice(startIndex, startIndex + itemsPerPage);

    // 🔹 Handler para troca de página
   const handlePageChange = (page: number) => {
       setCurrentPage(page);
       window.scrollTo({ top: 0, behavior: "smooth" }); // rola para o topo ao mudar página
    };


    return (
  
    <div>
    <div className="Grid text-white font-[var(--font-body)]">
      {currentCoins.map((coin) => {
        // Sempre prioriza coin_id (backend usa esse campo)
        const coinId = (coin as any).coin_id ?? coin.id ?? "";
          if (!coinId) return null;

         
          console.log("➡️ Navegando para /coin/", coinId);
          console.log("coinId que está indo no Link:", coinId);
          console.log("Objeto coin:", coin);

          return (
            <div className="gridItem">
              <input
              type="checkbox"
              checked={isFavorite(coinId)}
              onChange={() => {
                   if (!isAuthenticated) {
                         window.location.href = "/login";
                         return;
                   }
                  toggleFavorite(coin);
              }}
              className="checkbox"
              />
          
          <Link
            to={`/coin/${coinId}`}
            className="nav-btn home-inline tableItem"
            key={coinId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ul>
                <li className="gridItem">
                <strong>{coin.market_cap_rank}</strong>{" "}
                <img
                  src={coin.image}
                  alt={coin.name}
                  width={24}
                  style={{ verticalAlign: "middle", marginRight: 5 }}
                />
                <strong>{coin.name}</strong>{" "}
                ({coin.symbol?.toUpperCase()}) • $
                {coin.current_price?.toFixed(2)} •{" "}
                <span
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? "text-pos"
                      : "text-neg"
                  }
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>{" "}
                • {coin.market_cap?.toLocaleString("en-US")}
              </li>
            </ul>
             </Link>
            </div>
        );
      })}
      </div>
            <div className="flex justify-center mt-8 mb-12"
                style={{ marginBottom: "3rem"} }
            >
             <Pagination
                 currentPage={currentPage}
                 totalPages={totalPages}
                 onPageChange={handlePageChange}
              />
          </div>
    </div>
 
            );

}