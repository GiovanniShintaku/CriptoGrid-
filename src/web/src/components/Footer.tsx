import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="attribution">
        Dados fornecidos por{" "}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinGecko
        </a>
      </p>
    </footer>
  );
}