"use client";

import Link from "next/link";
import { useState, useEffect } from "react";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  return (
    <header
      style={{
        padding: "15px",
        borderBottom: "1px solid gray",
        backgroundColor: isDark ? "#333" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          <b>Student Number: 22461552</b>
        </span>

        <div>
          <button
            onClick={toggleTheme}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: isDark ? "#555" : "#f0f0f0",
              color: isDark ? "#fff" : "#000",
              border: "1px solid gray",
              cursor: "pointer",
            }}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: "5px 10px",
              backgroundColor: isDark ? "#555" : "#f0f0f0",
              color: isDark ? "#fff" : "#000",
              border: "1px solid gray",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav style={{ marginTop: "15px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Home", "About", "Escape Room", "Coding Races", "Court Room"].map(
              (item, idx) => (
                <li key={idx} style={{ marginBottom: "5px" }}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    style={{
                      textDecoration: "none",
                      color: isDark ? "#fff" : "#000",
                      display: "block",
                      padding: "8px",
                    }}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}


export default function HomePage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header />
      <main style={{ padding: "20px" }}>
        <h1>Home Page</h1>
        <p>This is your homepage content.</p>
      </main>
    </div>
  );
}
