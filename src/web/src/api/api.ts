import type { CoinData } from "@/types/coin";

const base = import.meta.env.VITE_API_BASE_URL ?? "/api";
console.log("🌐 Base URL =", base);

export async function getCoins(): Promise<CoinData[]> {
  const url = `${base}/PublicData`;
  console.log("Chamando:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

  return res.json();
}

export async function getCoinById(id: string): Promise<CoinData> {
  const url = `${base}/PublicData/${id}`;
  console.log("Chamando:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

  return res.json();
}

export async function getCoinHistory(id: string, timeframe: string): Promise<CoinData[]> {
  const url = `${base}/PublicData/${id}/history?timeframe=${timeframe}`;
  console.log("Chamando histórico:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

  return res.json();
}
