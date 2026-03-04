import React, { useState } from "react";
import AllProducts from "../components/AllProducts";

function Shop({ cartItems, setCartItems }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ padding: "80px 10px", background: "#000", minHeight: "100vh" }}>
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "50px",
          fontFamily: "'Cinzel Decorative', cursive",
          fontSize: "clamp(32px, 8vw, 52px)",
          letterSpacing: "clamp(4px, 2vw, 8px)",
          textTransform: "uppercase",
          textShadow: "0 0 20px rgba(128, 0, 0, 0.4)"
        }}
      >
        THE COLLECTIONS
      </h1>


      {/* GOTHIC SEARCH BAR */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
        <input
          type="text"
          placeholder="SEEK THY DESIRE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "90%",
            maxWidth: "600px",
            padding: "20px 30px",
            background: "rgba(10, 10, 10, 0.9)",
            border: "1px solid var(--goth-blood)",
            color: "var(--goth-silver)",
            fontSize: "16px",
            fontFamily: "'Spectral', serif",
            letterSpacing: "2px",
            outline: "none",
            transition: "all 0.5s ease",
            borderRadius: "0",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--goth-silver)";
            e.target.style.boxShadow = "0 15px 45px rgba(128, 0, 0, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--goth-blood)";
            e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
          }}
        />
      </div>

      <div
        style={{
          opacity: 0,
          animation: "gothicFadeIn 1.5s forwards",
        }}
      >
        <AllProducts
          cartItems={cartItems}
          setCartItems={setCartItems}
          searchQuery={searchQuery}
        />
      </div>

      <style>
        {`
          @keyframes gothicFadeIn {
            from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Shop;
