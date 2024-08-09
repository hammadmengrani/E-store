'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  _id: string;
  img?: string;
  title: string;
  price: number;
  quantity: number;
  discount?: number; // Optional discount field
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = typeof window !== "undefined" ? localStorage.getItem('cartItems') : "[]";
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem._id === item._id);
      
      if (existingItemIndex !== -1) {
        // If the item already exists, increment its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems; // Return updated items
      } else {
        // If it doesn't exist, add it to the cart with quantity 1
        return [{ ...item, quantity: 1 }, ...prevItems];
      }
    });
  };

  const incrementQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
