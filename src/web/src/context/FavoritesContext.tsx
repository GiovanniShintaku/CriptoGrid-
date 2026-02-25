import React, { createContext, useContext, useState, ReactNode } from "react";
import type { CoinData } from "@/types/coin";

interface FavoritesContextType {
    favorites: CoinData[];
    toggleFavorite: (coin: CoinData) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<CoinData[]>([]);

    const toggleFavorite = (coin: CoinData) => {
        const coinId = (coin as any).coin_id ?? coin.id;

        setFavorites((prev) => {
            const exists = prev.some(
                (f) => (f as any).coin_id ?? f.id === coinId
            );

            if (exists) {
                return prev.filter((f) => ((f as any).coin_id ?? f.id) !== coinId);
            }

            return [...prev, coin];
        });
    };

    const isFavorite = (id: string) => {
        return favorites.some((c) => ((c as any).coin_id ?? c.id) === id);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be inside <FavoritesProvider>");
    return ctx;
}