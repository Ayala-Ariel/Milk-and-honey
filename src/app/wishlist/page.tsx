'use client';

import Image from 'next/image';
import { useWishlist } from '@/contexts/WishListContext';
import { useCart } from '@/contexts/CartContext';
import styles from './page.module.css';

export default function WishListPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (p: any) => {
    addToCart({ id: p.id, title: p.title, price: p.price, description: p.description || '', category: p.category || '', image: p.image, rating: p.rating || { rate: 0, count: 0 }});
    removeFromWishlist(p.id);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map(item => (
            <div key={item.id} className={styles.card}>
              <Image src={item.image} alt={item.title} width={150} height={150} style={{ objectFit: 'contain' }} />
              <h3>{item.title}</h3>
              <p className={styles.price}>${item.price}</p>
              <div className={styles.actions}>
                <button onClick={() => moveToCart(item)}>Move to cart</button>
                <button onClick={() => removeFromWishlist(item.id)} className={styles.remove}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
