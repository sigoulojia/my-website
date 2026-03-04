import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ProductCard from "./ProductCard";

export default function AllProducts({ cartItems, setCartItems, searchQuery }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: supaData, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.log("Supabase error:", error);
          setProducts([]);
          return;
        }

        const supaProducts = supaData.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          images: p.image_url ? [p.image_url] : [],
          description: p.description || "",
        }));

        setProducts(supaProducts);
      } catch (err) {
        console.log("Fetch error:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 فلترة البحث
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <section className="responsive-grid">

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            images={product.images}
            name={product.name}
            price={product.price}
            cartItems={cartItems}
            setCartItems={setCartItems}
            showAddToCart={true}
          />
        ))
      ) : (
        <h2
          style={{
            color: "#ff4d4d",
            textShadow: "0 0 10px #ff0000",
            marginTop: "50px",
          }}
        >
          No products matched your search.
        </h2>
      )}
    </section>
  );
}
