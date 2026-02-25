import type { CoinData } from "@/types/coin";
import FiltroData_Grafico from "@components/FiltroData_Grafico";
import "@/styles/CoinScreen.css";
import "@/styles/global.css";

interface Props {
  coin: CoinData;
}

export default function CoinScreenPlaceholder({ coin }: Props) {
  return (
    <section
      className="coinContainer"
    >
     
      <div className="coinHeader">
      <div className="coinInfo">
        {coin.image && (
          <img
            src={coin.image}
            alt={coin.name}
            className="wh4rem"
          />
        )}
        <div className="coinText"> 
        <h3 className="coinName">
          <strong>{coin.name ?? "Coin"}</strong>{" "}
          ({coin.symbol?.toUpperCase() ?? "?"})
        </h3>

        {coin.current_price !== undefined && (
          <p
            className={`price ${
              coin.price_change_percentage_24h >= 0
                ? "text-accent"
                : "text-accent-pink"
            }`}
          >
            ${coin.current_price.toLocaleString()}
          </p>
        )}
        </div>
      </div>
       {/* Filtro de histórico */}
       <div className="filtroGrafico">
           <FiltroData_Grafico coinId={coin.id ?? "bitcoin"} />
       </div>

      
      </div>
       <div className="conteudoGrafico"> 
           <p className="placeholder">Dashboard em construção...</p>
       </div>
    </section>
  );
}