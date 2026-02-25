import React, { useEffect, useRef, useState } from "react";
import { Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCoins } from "@/api/api";
import type { CoinData } from "@/types/coin";
import logo from "@assets/logo.svg";
import "../styles/global.css";
import "../styles/Header.css";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCoins = async () => {
      const q = query.trim();
      if (q.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const coins = await getCoins();
        const filtered = coins
          .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 4);
        setSuggestions(filtered);
        setShowDropdown(true);
      } catch (err) {
        console.error("❌ Erro ao buscar moedas:", err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchCoins, 300);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id?: string) => {
    if (!id) return;
    setQuery("");
    setShowDropdown(false);
    navigate(`/coin/${id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0 && suggestions[0].id) {
      handleSelect(suggestions[0].id);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-name">CriptoGrid</h1>

        <Link to="/" className="nav-btn home-inline">
          <span>Home</span>
        </Link>
      </div>

      <nav className="header-right">
        <div ref={searchRef} className="search-bar" style={{ position: "relative" }}>
          <Search size={20} className="search-icon" />

          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              placeholder="Procure uma coin"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
          </form>

          {showDropdown && (loading || suggestions.length > 0) && (
            <ul
              className="dropdown-list"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
                overflow: "hidden",
                zIndex: 100,
              }}
            >
              {loading ? (
                <li
                  style={{
                    padding: "10px 14px",
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                  }}
                >
                  Carregando...
                </li>
              ) : (
                suggestions.map((coin) => (
                  <li
                    key={coin.id}
                    onClick={() => handleSelect(coin.id)}
                    style={{
                      padding: "10px 14px",
                      color: "var(--text)",
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background 0.2s ease-in-out, color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "color-mix(in oklab, var(--accent-pink) 18%, transparent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {coin.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <Link to="/perfil"
              className="nav-btn"
              onClick={(e) => {
                  if (!isAuthenticated) {
                     e.preventDefault();
                      window.location.href = "/login";
                      }
                  }}
        >
          <User size={22} />
          <span>Perfil</span>
        </Link>
      </nav>
    </header>
  );
}