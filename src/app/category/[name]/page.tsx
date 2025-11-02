import { getProductsByCategory, Product } from '@/utils/api';
import ProductCard from '@/components/productCard/ProductCard';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.name) {
    notFound();
  }

  const decodedName = decodeURIComponent(resolvedParams.name);
  console.log('Category page params:', resolvedParams.name, 'decoded:', decodedName);

  try {
    const products = await getProductsByCategory(decodedName);

    console.log('Products received:', products?.length || 0);

    if (!products || products.length === 0) {
      return (
        <main className={styles.container}>
          <h1 className={styles.title}>No Products Found</h1>
          <p>No products found in category: {decodedName}</p>
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Category name received: {resolvedParams.name}
          </p>
        </main>
      );
    }

    // עיצוב שם הקטגוריה להצגה
    const displayName = decodedName
      .split(/([\s-])+/)
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <main className={styles.container}>
        <h1 className={styles.title}>{displayName}</h1>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Error</h1>
        <p>Failed to load products. Please try again later.</p>
      </main>
    );
  }
}