import { getProducts } from '@/utils/api';
import ProductCard from '@/components/productCard/ProductCard';
import styles from './page.module.css';

export default async function HomePage() {
  const products = await getProducts();
  
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to Our <span style={{ color: '#ffc107' }}>Store</span></h1>
        <p className={styles.subtitle}>Discover our amazing products</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}