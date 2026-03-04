import React from "react";
import Navbar from "./Navbar";
import CartPanel from "./CartPanel";

function Layout({ children, cartItems, setCartItems }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {}
      <Navbar />

      {/* Cart Panel */}
      <CartPanel cartItems={cartItems} setCartItems={setCartItems} />

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}

export default Layout;