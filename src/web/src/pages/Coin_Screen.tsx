import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import CoinScreenPlaceholder from "@components/CoinScreenPlaceholder";
import FiltroData_Grafico from "@components/FiltroData_Grafico";
import { getCoinHistory } from "@/api/api";
import type { CoinData } from "@/types/coin";
import "@/styles/global.css";
import "@/styles/CoinScreen.css"; 

export default function CoinScreen() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      if (!id) return;
      try {
        console.log(`📡 Buscando histórico para ${id}`);
        const history = await getCoinHistory(id, "1y");

        if (!history || !history.length) {
          console.warn("⚠️ Nenhum histórico retornado.");
          
          return;
        }

        const latest = history[0];
        console.log("✅ Histórico retornado:", latest);

        setCoin(latest);
      } catch (error) {
        console.error("❌ Erro ao buscar histórico:", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id, navigate]);

  return (
    <>
      <Header />
      <main className="min-h-screen text-white p-6 flex flex-col items-center">
        {loading ? (
          <p className="mt-32 text-gray-400 animate-pulse">
            Carregando dados...
          </p>
        ) : coin ? (
          <>
            <CoinScreenPlaceholder coin={coin} />
          </>
        ) : (
          <p>Coin não encontrada.</p>
        )}
      </main>
      <Footer />
    </>
  );
}