import React, { useState, useEffect } from "react";
import "./CartPanel.css";

function CartPanel({ cartItems, setCartItems }) {
  const [open, setOpen] = useState(false);
  const [removingIndex, setRemovingIndex] = useState(null);

  const toggleCart = () => setOpen((prev) => !prev);
  const closeCart = () => setOpen(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeCart();
    };

    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  const removeItem = (index) => {
    setRemovingIndex(index);
    setTimeout(() => {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
      setRemovingIndex(null);
    }, 300);
  };

  const handleCheckout = async () => {
    if (!cartItems.length) {
      alert("Cart is empty!");
      return;
    }

    const userPhone = prompt("Please enter your phone number:");
    if (!userPhone) return;

    const itemsText = cartItems
      .map(
        (item) =>
          `• ${item.name} | Color: ${item.color?.name || "N/A"} | Size: ${
            item.size || "N/A"
          } | DZD ${item.price}`
      )
      .join("\n");

    const total = cartItems.reduce((a, b) => a + b.price, 0);

    const message = `
📦 New Order
-----------------
${itemsText}

💰 Total: DZD ${total}
📞 Phone: ${userPhone}
`;

    const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

    try {
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      alert("✅ Order sent successfully!");
      setCartItems([]);
      closeCart();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send order");
    }
  };

  const total = cartItems.reduce((a, b) => a + b.price, 0);

  return (
    <>
      <div className="cart-button" onClick={toggleCart}>
        🛒 {cartItems.length}
      </div>

      {open && <div className="cart-backdrop" onClick={closeCart} />}

      {open && (
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="cart-close-button" onClick={closeCart}>
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty-cart">Cart is empty</p>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className={`cart-item ${
                  removingIndex === idx ? "fade-out" : ""
                }`}
              >
                <div className="cart-row">
                  <span>{item.name}</span>
                  <span>DZD {item.price}</span>
                </div>
                <small>
                  Color: {item.color?.name || "N/A"} | Size:{" "}
                  {item.size || "N/A"}
                </small>
                <button onClick={() => removeItem(idx)}>✕</button>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <strong>Total: DZD {total}</strong>
              <button onClick={handleCheckout}>
                Checkout via Telegram
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CartPanel;
