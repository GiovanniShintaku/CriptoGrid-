import Footer from "@/components/Footer";
import Header from "../components/Header";
import HomeCoinTable from "../components/Home_Table_Relevantes";
import HomeTrendTable from "../components/Home_Table_Tendencia";
import React, { useState } from "react";
import "@/styles/global.css";
import "@/styles/Home.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"relevancia" | "tendencia">("relevancia");

 type Filters = {
        name: string;
        minPrice: string;
        maxPrice: string;
        min24h: string;
        max24h: string;
        sortOrder: "asc" | "desc";
    };

    const [filters, setFilters] = useState<Filters>({
        name: "",
        minPrice: "",
        maxPrice: "",
        min24h: "",
        max24h: "",
        sortOrder: "desc",
    });

  // vai pegar o input do filtro e aplicar na tabela 
    const handleFilterChange = (field: keyof Filters, value: string | "asc" | "desc") => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

  //função para o botao de ordem 
   const toggleSortOrder = () => {
        setFilters((prev) => ({
            ...prev,
            sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        }));
   
    };

    const clearFilters = () => {
        setFilters({
            name: "",
            minPrice: "",
            maxPrice: "",
            min24h: "",
            max24h: "",
            sortOrder: "desc",
        });
    };


  return (
    <>
      <Header />

      <div className="HomeTab">
        <button
          className={`${
            activeTab === "relevancia"
              ? "bg-[var(--accent-pink)] text-white shadow-lg scale-105"
              : "bg-[var(--panel)] text-gray-300 hover:bg-[var(--accent-pink)] hover:text-white"
          }`}
          onClick={() => setActiveTab("relevancia")}
        >
          Relevância
        </button>

        <button
          className={`${
            activeTab === "tendencia"
              ? "bg-[var(--accent-pink)] text-white shadow-lg scale-105"
              : "bg-[var(--panel)] text-gray-300 hover:bg-[var(--accent-pink)] hover:text-white"
          }`}
          onClick={() => setActiveTab("tendencia")}
        >
          Tendência
        </button>
      </div>

          <div className="filter-bar filter-group">
              <input
                  type="text"
                  placeholder="🔍 Nome..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="filter-input"
              />

              <input
                  type="number"
                  placeholder="Preço mín."
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="filter-input"
              />

              <input
                  type="number"
                  placeholder="Preço máx."
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="filter-input"
              />

              <input
                  type="number"
                  placeholder="24h mín."
                  value={filters.min24h}
                  onChange={(e) => handleFilterChange("min24h", e.target.value)}
                  className="filter-input"
              />

              <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange("sortOrder", e.target.value as "asc" | "desc")}
                  className="filter-select filter-input"
              >
                  <option value="asc">⬆️ Crescente</option>
                  <option value="desc">⬇️ Decrescente</option>
              </select>

              <button onClick={clearFilters} className="filter-input">
                  Limpar
              </button>
          </div>


      <main className="min-h-screen px-6 flex flex-col items-center">
           <div className="tab-content fade-transition"> 
                  {activeTab === "relevancia" ? <HomeCoinTable filters={filters} /> : <HomeTrendTable filters={filters} />}
            </div>
      </main>

      <Footer />
    </>
  );
}