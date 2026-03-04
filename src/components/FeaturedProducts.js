import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function FeaturedProducts() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data: supaData, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        let supaProducts = [];
        if (!error && supaData) {
          supaProducts = supaData.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            images: p.image_url ? [p.image_url] : [],
            description: p.description || "",
          }));
        }

        supaProducts.sort((a, b) => b.id - a.id);
        setFeatured(supaProducts.slice(0, 5));
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setFeatured([]);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="responsive-grid" style={{
      background: "linear-gradient(180deg, #000 0%, #0a0505 100%)",
      position: "relative",
      borderTop: "1px solid var(--goth-blood)",
      borderBottom: "1px solid var(--goth-blood)",
    }}>
      <div style={{
        position: "absolute",
        top: "-20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        padding: "0 20px",
        color: "var(--goth-blood)",
        fontFamily: "'Cinzel Decorative', cursive",
        fontSize: "clamp(18px, 4vw, 24px)",
        letterSpacing: "4px",
        whiteSpace: "nowrap"
      }}>
        FEATURED ARTIFACTS
      </div>

      {featured.map((product) => (
        <div
          key={product.id}
          className="product-card ornate-border"
          style={{
            background: "rgba(15, 15, 15, 0.8)",
            textAlign: "center",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
        >

          <div
            style={{
              width: "100%",
              height: "240px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
              marginBottom: "20px",
            }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(50%)",
                transition: "all 0.8s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.filter = "grayscale(0%)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.filter = "grayscale(50%)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
          <h3
            style={{
              color: "#fff",
              fontSize: "18px",
              fontFamily: "'Cinzel Decorative', cursive",
              marginBottom: "12px",
              letterSpacing: "1px"
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              color: "var(--goth-blood)",
              fontWeight: "600",
              fontSize: "20px",
              marginBottom: "15px",
              fontFamily: "'Spectral', serif",
            }}
          >
            {product.price} DZD
          </p>
          <div style={{
            width: "40px",
            height: "1px",
            background: "var(--goth-blood)",
            margin: "0 auto 15px",
          }}></div>
          <p
            style={{
              color: "var(--goth-silver)",
              fontSize: "14px",
              lineHeight: "1.6",
              padding: "0 5px",
              opacity: 0.7,
              fontStyle: "italic",
              fontFamily: "'Spectral', serif",
            }}
          >
            {product.description || "A dark treasure awaits."}
          </p>
        </div>
      ))}
    </section>
  );
}

export default FeaturedProducts;
