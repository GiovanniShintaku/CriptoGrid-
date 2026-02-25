import type { CoinData, OHLCData } from "../types/Coin";

const base = "http://camillamanzini-001-site1.ktempurl.com/api" ?? "/api";
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

    const data: CoinData[] = await res.json();

       return data;
}
