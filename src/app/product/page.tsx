import { getProducts, Product } from '@/utils/api';
import ProductCard from '@/components/productCard/ProductCard';
import Header from '@/components/header/Header';
import Image from 'next/image';

export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(error);
  }

  const latestProducts = products.slice(0, 4);

  return (
    <main>
        <Header />
        <section className="hero-section" style={{ 
            textAlign: 'center', 
            margin: '60px 0', 
            padding: '20px',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image
                    src="/logo.png"
                    alt="The Milk & Honey Distillery Logo"
                    width={150}
                    height={150}
                    style={{ objectFit: 'contain' }}
                />
                <h1 style={{ fontSize: '2.5rem', marginTop: '10px', color: '#333' }}>
                    THE MILK & HONEY DISTILLERY
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Fine Spirits & Accessories</p>
            </div>
        </section>

        <section className="latest-products" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ textAlign: 'center', margin: '40px 0', borderBottom: '2px solid #ffc107', paddingBottom: '10px' }}>LATEST PRODUCTS</h2>
            
            {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        </section>
    </main>
  );
}