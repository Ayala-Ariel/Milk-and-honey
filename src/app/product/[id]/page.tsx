import { getProductById } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage(props: ProductPageProps | Promise<ProductPageProps>) {
  // Next.js may pass props as a Promise in some runtimes; unwrap it first
  const resolvedProps = await props;
  const id = resolvedProps.params.id;
  const numericId = Number(id);

  if (isNaN(numericId) || numericId <= 0) {
    return (
      <main className={styles.errorContainer}>
        <h1>Invalid Product ID</h1>
        <p>The product ID provided is not valid.</p>
        <Link href="/">Back to home</Link>
      </main>
    );
  }
  
  let product;
  try {
    product = await getProductById(numericId);
  } catch (err) {
    console.error(err);
    return (
      <main className={styles.errorContainer}>
        <h1>Product not found</h1>
        <p>We couldn't find the product you're looking for.</p>
        <Link href="/">Back to home</Link>
      </main>
    );
  }

  // fakestoreapi returns a single `image` prop; create images array for gallery
  const images = [product.image];

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back</Link>
      <div className={styles.productGrid}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <Image 
              src={images[0]} 
              alt={product.title} 
              width={600} 
              height={600} 
              className={styles.productImage}
              priority
            />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnailGrid}>
              {images.map((src, i) => (
                <div key={i} className={styles.thumbnail}>
                  <Image 
                    src={src} 
                    alt={`${product.title} ${i}`} 
                    width={80} 
                    height={80} 
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.actions}>
            <AddToCartButton product={product} />
            {/* wishlist button is a client component */}
            <WishlistButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
