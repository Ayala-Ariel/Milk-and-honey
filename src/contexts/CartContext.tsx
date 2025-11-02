'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/utils/api';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    total: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    // change can be positive or negative
    updateQuantity: (productId: number, change: number) => void;
    setQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // load initial state from localStorage when running in browser
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const raw = localStorage.getItem('cart');
            if (!raw) return [];
            return JSON.parse(raw) as CartItem[];
        } catch (e) {
            console.error('Failed to parse cart from localStorage', e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }, [cartItems]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(i => i.id === product.id);
            if (existing) {
                return prevItems.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(i => i.id !== productId));
    };

    const updateQuantity = (productId: number, change: number) => {
        setCartItems(prev => prev
            .map(i => i.id === productId ? { ...i, quantity: Math.max(0, i.quantity + change) } : i)
            .filter(i => i.quantity > 0)
        );
    };

    const setQuantity = (productId: number, quantity: number) => {
        setCartItems(prev => prev
            .map(i => i.id === productId ? { ...i, quantity: Math.max(0, quantity) } : i)
            .filter(i => i.quantity > 0)
        );
    };

    const clearCart = () => setCartItems([]);

    const value: CartContextType = { cartItems, cartCount, total, addToCart, removeFromCart, updateQuantity, setQuantity, clearCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};