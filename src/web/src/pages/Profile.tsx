import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileCoinGrid from "../components/ProfileCoinGrid";

export default function Profile() {
    const coins = [
    {
      coin_id: "1",
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      name: "Bitcoin",
      symbol: "BTC",
      currentPrice: 67345.21,
      PriceChange24h: 2.34,
      totalVolume: 984000000,
    },
    {
      coin_id: "2",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      name: "Ethereum",
      symbol: "ETH",
      currentPrice: 2431.12,
      PriceChange24h: -1.12,
      totalVolume: 340000000,
    },
  ];
  return (
    <>
      <Header />
      <ProfileCoinGrid/>
      <Footer />
    </>
  );
}