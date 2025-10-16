"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// --- Header component ---
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
            {["Home", "About", "Escape Room"].map((item, idx) => (
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
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

// --- Escape Room Page ---
export default function EscapeRoomPage() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState(1);
  const [input, setInput] = useState("");

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else if (!isRunning && timer !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const checkStage = () => {
    if (stage === 1 && input.trim().toLowerCase() === "format code") {
      setStage(2);
      setInput("");
    } else if (stage === 2 && input.trim().toLowerCase() === "debug") {
      setStage(3);
      setInput("");
    } else if (stage === 3 && input.includes("for")) {
      setStage(4);
      setInput("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/escape-room-bg.jpg')", // place your image in /public
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>Escape Room Builder</h1>

        {/* Timer */}
        <div style={{ marginBottom: "15px" }}>
          <p>⏱ Timer: {timer}s</p>
          <button
            onClick={() => setIsRunning(true)}
            style={{ marginRight: "5px" }}
          >
            Start
          </button>
          <button onClick={() => setIsRunning(false)}>Stop</button>
        </div>

        {/* Stages */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "500px",
          }}
        >
          <h2>Stage {stage}</h2>

          {stage === 1 && <p>Format this code correctly to proceed!</p>}
          {stage === 2 && <p>Click the image that helps debug the code!</p>}
          {stage === 3 && (
            <p>Write code to generate numbers between 0 and 1000!</p>
          )}
          {stage === 4 && <p>🎉 Congratulations! You escaped!</p>}

          {stage < 4 && (
            <>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your code or action..."
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              />
              <button
                onClick={checkStage}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
