import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Bats from "../components/Bats";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutSection from "../components/AboutSection";
import "./Home.css";

function Home({ cartItems, setCartItems }) {
  return (
    <div className="home-container">

      {}
      <Banner />
      <Bats />

      {}
      <section id="shop-section">
        <h2 className="section-title">Featured Products</h2>
        <FeaturedProducts cartItems={cartItems} setCartItems={setCartItems} />
      </section>

      {}
      <AboutSection />

      {}
      <div className="cta-section">
        <h2>Join the Whynotdz03 Revolution</h2>
        <p>Discover unique black-themed streetwear designed to stand out.</p>
        <Link to="/shop">
          <button>Shop Now</button>
        </Link>
      </div>

    </div>
  );
}

export default Home;
