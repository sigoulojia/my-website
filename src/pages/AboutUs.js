import React from "react";
import Banner from "../components/Banner";
import Bats from "../components/Bats";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">
      {}
      <Banner />
      <Bats />

      {}
      <div className="about-container">
        <h1 className="fade-in title">About Us</h1>

        <p className="fade-in delay-1">
          <strong>Whynotdz03</strong> is a bold streetwear brand based in Laghouat, Algeria. 
          Our designs are unique, black-themed, and inspired by urban aesthetics and dark fashion.
        </p>

        <p className="fade-in delay-2">
          <strong>We focus on:</strong><br />
          🕸️ High-quality materials<br />
          🕸️ Comfortable fit<br />
          🕸️ Exclusive and limited-edition designs<br />
          🕸️ Affordable prices
        </p>

        <p className="fade-in delay-3">
          Our mission is to empower your style — outfits with confidence, attitude, 
          and a statement that makes you stand out in the crowd.
        </p>

       <p className="fade-in delay-4 neon-blink">
  Why Not? Because your style should speak for you.
</p>

        <p className="fade-in delay-5">
          Join the <strong>Whynotdz03</strong> revolution and embrace your unique vibe!
        </p>

        <div className="cta-section fade-in delay-6">
          <a href="/shop">
            <button className="cta-button">Explore Our Collection</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
