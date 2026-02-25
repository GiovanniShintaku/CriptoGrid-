export interface OHLCData {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface CoinData {
    _id?: string;
    id?: string;
    coin_id?: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume?: number | null;
    price_change_percentage_24h: number;
    last_updated: string;
    ingestion_date?: string;
    ohlc?: OHLCData[];
}