import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BatButton.css"; 

function BatButton({ to, label }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => navigate(to), 300); 
  };

  return (
    <button
      className={`bat-button DZD{clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default BatButton;
