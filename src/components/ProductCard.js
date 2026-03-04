import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, images, name, price, cartItems, setCartItems, showAddToCart = true }) {
  const handleAddToCart = () => {
    const newItem = { id, images, name, price };
    if (!Array.isArray(cartItems)) setCartItems([newItem]);
    else setCartItems([...cartItems, newItem]);
  };

  return (
    <div
      className="product-card ornate-border"
      style={{
        background: "rgba(10, 10, 10, 0.95)",
        padding: "20px",
        textAlign: "center",
        color: "var(--goth-silver)",
        width: "280px",
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "420px",
        position: "relative",
      }}
    >
      <Link to={`/product/${id}`} style={{ overflow: "hidden", display: "block", borderRadius: "2px" }}>
        <img
          src={images[0]}
          alt={name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            filter: "grayscale(20%) brightness(0.9)",
            transition: "all 0.6s ease",
          }}
          onMouseEnter={e => {
            e.target.style.filter = "grayscale(0%) brightness(1.1)";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={e => {
            e.target.style.filter = "grayscale(20%) brightness(0.9)";
            e.target.style.transform = "scale(1)";
          }}
        />
      </Link>

      <div style={{ marginTop: "15px" }}>
        <h3 style={{
          fontFamily: "'Cinzel Decorative', cursive",
          color: "#fff",
          margin: "10px 0",
          fontSize: "1.1rem",
          letterSpacing: "1px"
        }}>
          {name}
        </h3>
        <p style={{
          fontFamily: "'Spectral', serif",
          color: "var(--goth-blood)",
          fontWeight: "600",
          margin: "5px 0",
          fontSize: "1.2rem",
          textShadow: "0 0 10px rgba(128, 0, 0, 0.3)"
        }}>
          {price} DZD
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            style={{
              background: "transparent",
              color: "var(--goth-silver)",
              border: "1px solid var(--goth-blood)",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "0",
              fontWeight: "400",
              fontFamily: "'Cinzel Decorative', cursive",
              fontSize: "0.8rem",
              letterSpacing: "2px",
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={e => {
              e.target.style.background = "var(--goth-blood)";
              e.target.style.color = "#fff";
              e.target.style.boxShadow = "0 0 20px var(--goth-blood)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--goth-silver)";
              e.target.style.boxShadow = "none";
            }}
          >
            SELECT ITEM
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
