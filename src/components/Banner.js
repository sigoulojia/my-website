import React from "react";
import bannerImage from "../assets/banner2.jpg";
import "./Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-overlay"></div>

      <img
        src={bannerImage}
        alt="Banner"
        className="banner-image"
      />

      <div className="banner-text">
        <h1>Welcome to Our Shop</h1>
        <p>Discover the best products at unbeatable prices!</p>

        <Link to="/shop" className="banner-btn">
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Banner;
