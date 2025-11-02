import { getProducts } from '@/utils/api';
import ProductCard from '@/components/productCard/ProductCard';
import Image from 'next/image';
import styles from './page.module.css';

export default async function HomePage() {
  const products = await getProducts();
  // הצגת רק 4 מוצרים ראשונים
  const featuredProducts = products.slice(0, 4);
  
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.logoContainer}>
          <Image 
            src="/logo2.png" 
            alt="Store Logo" 
            width={200} 
            height={100}
            className={styles.logo}
            priority
          />
        </div>
      </div>

      <div className={styles.grid}>
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}