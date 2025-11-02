'use client'; 

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import styles from './page.module.css';

export default function CartPage() {
  const { cartItems, total, updateQuantity, removeFromCart, clearCart } = useCart();
  
  return (
    <main className={styles.container}>
      <div className={styles.cartContent}>
        <h1 className={styles.title}>Order <span className={styles.highlight}>Summary</span></h1>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.imageCol}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={100} 
                    height={100} 
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.infoCol}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <div className={styles.quantityControls}>
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease">-</button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase">+</button>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.summaryFooter}>
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>TOTAL:</span>
          <span className={styles.totalPrice}>
             {total.toFixed(2)} $
          </span>
        </div>
        
        <button className={styles.completeButton}>
          COMPLETE ORDER
        </button>
      </div>
    </main>
  );
}