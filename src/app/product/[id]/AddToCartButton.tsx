'use client';

import styles from './AddToCartButton.module.css';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/utils/api';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={styles.button}
    >
      Add to Cart 🛒
    </button>
  );
}