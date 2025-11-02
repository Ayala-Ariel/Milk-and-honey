'use client';

import { useWishlist } from '@/contexts/WishListContext';
import styles from './WishlistButton.module.css';
import { Product } from '@/utils/api';

interface Props { product: Product }

export default function WishlistButton({ product }: Props) {
  const { addToWishlist } = useWishlist();
  return (
    <button className={styles.btn} onClick={() => addToWishlist({ id: product.id, title: product.title, price: product.price, image: product.image })}>
      ❤️ Save
    </button>
  );
}
