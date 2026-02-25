import type { CoinData } from "../types/Coin";


interface Props {
  coin: CoinData;
}

export default function CoinScreenPlaceholder({ coin }: Props) {
  return (
    <section
      className="w-full max-w-6xl min-h-[400px] flex flex-col items-center justify-start 
                 border border-dashed border-gray-700 rounded-2xl bg-gray-900/40 p-6"
    >
      <div className="w-full mb-6">
       
      </div>

      <p className="text-gray-500 mb-2 italic">Dashboard em construção...</p>

      <div className="flex flex-col items-center">
        {coin.image && (
          <img
            src={coin.image}
            alt={coin.name}
            className="w-16 h-16 mb-2 rounded-full"
          />
        )}

        <p className="text-gray-400 text-sm">
          <strong>{coin.name ?? "Coin"}</strong>{" "}
          ({coin.symbol?.toUpperCase() ?? "?"})
        </p>

        {coin.current_price !== undefined && (
          <p
            className={`mt-1 ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ${coin.current_price.toLocaleString()}
          </p>
        )}
      </div>
    </section>
  );
}