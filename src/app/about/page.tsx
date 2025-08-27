"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span><b>Student Number: 12345678</b></span>

        <button onClick={() => setMenuOpen(!menuOpen)}>
          ☰ {/* Hamburger Menu */}
        </button>
      </div>

      {menuOpen && (
        <nav style={{ marginTop: "10px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/escape-room">Escape Room</Link></li>
            <li><Link href="/coding-races">Coding Races</Link></li>
            <li><Link href="/court-room">Court Room</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}