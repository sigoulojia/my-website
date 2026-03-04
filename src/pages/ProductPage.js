import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function ProductPage({ cartItems, setCartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          setErrorMsg("Product not found");
          setProduct(null);
          setLoading(false);
          return;
        } else {
          setProduct({
            ...data,
            images: data.image_url ? [data.image_url] : [],
            description: data.description || "",
          });
        }

        const { data: recData } = await supabase
          .from("products")
          .select("*")
          .neq("id", id);

        const supaList = recData
          ? recData.map((p) => ({
            ...p,
            images: p.image_url ? [p.image_url] : [],
            description: p.description || "",
          }))
          : [];

        // Shuffle recommended products
        const combined = [...supaList];
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combined[i], combined[j]] = [combined[j], combined[i]];
        }

        setRecommended(combined.slice(0, 8));
      } catch (err) {
        console.error(err);
        setErrorMsg("Error fetching product");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const newItem = { ...product, images: product.images, size: selectedSize };
    if (!Array.isArray(cartItems)) setCartItems([newItem]);
    else setCartItems([...cartItems, newItem]);
  };

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;
  if (errorMsg) return <p style={{ color: "#fff" }}>{errorMsg}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        padding: "100px 40px",
        color: "var(--goth-silver)",
        background: "#000",
        minHeight: "100vh",
        fontFamily: "'Spectral', serif"
      }}
    >
      <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* PRODUCT GALLERY */}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: "600px",
            position: "relative"
          }}
        >
          <div className="ornate-border" style={{ padding: "10px", background: "rgba(10,10,10,0.8)" }}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "brightness(0.8) contrast(1.1)",
                transition: "filter 0.5s ease"
              }}
              onMouseEnter={e => e.target.style.filter = "brightness(1) contrast(1)"}
              onMouseLeave={e => e.target.style.filter = "brightness(0.8) contrast(1.1)"}
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: "600px",
            padding: "20px"
          }}
        >
          <h1 style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: "48px",
            marginBottom: "15px",
            color: "#fff",
            letterSpacing: "2px"
          }}>
            {product.name}
          </h1>

          <div style={{ height: "2px", width: "100px", background: "var(--goth-blood)", marginBottom: "30px" }}></div>

          <p
            style={{
              fontSize: "32px",
              marginBottom: "30px",
              fontWeight: "400",
              color: "var(--goth-blood)",
              fontFamily: "'Cinzel Decorative', cursive"
            }}
          >
            {product.price} DZD
          </p>

          <p style={{ marginBottom: "40px", lineHeight: "1.8", fontSize: "18px", opacity: 0.8 }}>
            {product.description || "A masterfully crafted piece for those who walk the nocturnal paths."}
          </p>

          {/* SIZE SELECTION */}
          <div style={{ marginBottom: "40px" }}>
            <p style={{
              fontFamily: "'Cinzel Decorative', cursive",
              fontWeight: "bold",
              marginBottom: "15px",
              fontSize: "14px",
              letterSpacing: "2px"
            }}>
              SELECT SIZE
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "0",
                    border:
                      selectedSize === size
                        ? "1px solid var(--goth-blood)"
                        : "1px solid rgba(255,255,255,0.1)",
                    background: selectedSize === size ? "var(--goth-blood)" : "transparent",
                    color: "#fff",
                    fontWeight: "400",
                    fontFamily: "'Spectral', serif",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              background: "transparent",
              color: "#fff",
              padding: "20px 50px",
              border: "1px solid var(--goth-blood)",
              cursor: "pointer",
              borderRadius: "0",
              fontWeight: "400",
              fontFamily: "'Cinzel Decorative', cursive",
              fontSize: "18px",
              letterSpacing: "4px",
              transition: "all 0.5s ease"
            }}
            onMouseEnter={e => {
              e.target.style.background = "var(--goth-blood)";
              e.target.style.boxShadow = "0 0 40px var(--goth-blood)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            ACQUIRE ITEM
          </button>
        </div>
      </div>

      {/* RECOMMENDED */}
      <div style={{ marginTop: "80px" }}>
        <h2 style={{
          fontSize: "28px",
          marginBottom: "40px",
          fontFamily: "'Cinzel Decorative', cursive",
          textAlign: "center",
          color: "#fff",
          letterSpacing: "3px"
        }}>
          OTHER RELIQUARIES
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {recommended.map((rec) => (
            <Link
              key={rec.id}
              to={`/product/${rec.id}`}
              style={{
                width: "220px",
                textDecoration: "none",
                color: "var(--goth-silver)",
                background: "rgba(10,10,10,0.5)",
                border: "1px solid rgba(128,0,0,0.1)",
                transition: "all 0.4s ease",
                padding: "15px"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--goth-blood)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(128,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={rec.images[0]}
                alt={rec.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "15px",
                  filter: "grayscale(50%)"
                }}
              />
              <p style={{ fontWeight: "bold", fontFamily: "'Cinzel Decorative', cursive", fontSize: "14px", marginBottom: "5px" }}>{rec.name}</p>
              <p style={{ color: "var(--goth-blood)", fontSize: "16px" }}>{rec.price} DZD</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
