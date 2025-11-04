'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/utils/api';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishListContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const formattedPrice = product.price.toFixed(2);
  const productHref = `/product/${product.id}`;

  const handleAddToCart = () => {
    addToCart(product);
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      button.classList.add(styles.clicked);
      setTimeout(() => button.classList.remove(styles.clicked), 200);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id: product.id, title: product.title, price: product.price, image: product.image });
  };

  return (
    <div className={styles.card}> 
      <div className={styles['image-container']}>
        <Link href={productHref} className={styles['image-link']}>
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
      </div>
      <div className={styles['product-info']}>
        <h3 className={styles.title}>
          <Link href={productHref} className={styles['title-link']}>
            {product.title.length > 50 ? product.title.substring(0, 50) + '...' : product.title}
          </Link>
        </h3>
        <p className={styles.description}>
          {product.description?.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
        </p>
        <div className={styles.details}>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.price}>
              {formattedPrice} $
            </p>
        </div>
      </div>
      <div className={styles.actions}>
        <button 
          className={styles['add-to-cart-button']}
          onClick={handleAddToCart}
        >
          🛒 ADD TO CART
        </button>

        <button
          className={styles['wish-button']}
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
        >
          ❤️
        </button>
      </div>
    </div>
  );
}