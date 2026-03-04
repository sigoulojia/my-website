import React from "react";
import batImg from "../assets/bat.png";

function Bats() {
  const batsCount = Array.from({ length: 12 }); // More bats for density

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none", zIndex: 10 }}>
      {batsCount.map((_, i) => {
        const startY = Math.random() * 80 + 10; // 10% to 90% height
        const scale = 0.5 + Math.random(); // 0.5x to 1.5x scale
        const duration = 15 + Math.random() * 20; // 15s to 35s speed
        const delay = -Math.random() * 30; // Random offset to distribute them evenly

        return (
          <img
            key={i}
            src={batImg}
            alt="bat"
            className="bat"
            style={{
              "--start-y": `${startY}vh`,
              "--scale": scale,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              width: "40px",
              height: "auto",
            }}
          />
        );
      })}
    </div>
  );
}

export default Bats;
