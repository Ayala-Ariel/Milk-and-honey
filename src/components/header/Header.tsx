'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useCart } from '@/contexts/CartContext'; 

export default function Header() {
  const { cartCount } = useCart();
  
  const navItems = [
    { name: 'Home', href: '/', isActive: true },
    { name: "Men's Clothing", href: '/category/men%27s%20clothing', isActive: false },
    { name: "Women's Clothing", href: '/category/women%27s%20clothing', isActive: false },
    { name: 'Jewelery', href: '/category/jewelery', isActive: false },
    { name: 'Electronics', href: '/category/electronics', isActive: false },
    { name: 'Wishlist', href: '/wishlist', isActive: false },
    { name: 'Contact Us', href: '/contact', isActive: false },
  ];
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles['logo-link']}>
            <Image
                src="/logo1.png" // התיקון שהיה צריך לבצע
                alt="Logo"
                width={30} 
                height={30} 
                style={{ objectFit: 'contain' }}
            />
            <span>SHOP</span>
        </Link>
      </div>

      <nav>
        <ul className={styles.nav}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`${styles['nav-link']} ${item.isActive ? styles.active : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.cartAndLinks}>
        <Link href="/wishlist" className={styles['wishlist-link']}>Wishlist</Link>
        <Link href="/cart" className={styles['cart-link']}>Cart ({cartCount})</Link>
      </div>
    </header>
  );
}