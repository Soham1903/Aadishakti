import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    // Prevent duplicates by ID
    const exists = cartItems.find((item) => item.title === course.title);
    if (!exists) {
      setCartItems((prevItems) => [...prevItems, course]);
    } else {
      alert("This course is already in the cart");
    }
  };

  const removeFromCart = (title) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.title !== title));
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
