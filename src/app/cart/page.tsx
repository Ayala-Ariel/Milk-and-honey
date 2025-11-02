// נדרש לייבא את הנתונים והקומפוננטה
import { getProducts, Product } from '@/utils/api';
import ProductCard from '@/components/productCard/ProductCard';
import Header from '@/components/header/Header'; // מייבאים את קומפוננטת ה-Header העתידית

// קומפוננטת שרת אסינכרונית (Server Component)
export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // אחזור נתונים מה-API באמצעות הפונקציה שכתבנו
    products = await getProducts();
  } catch (err) {
    // טיפול בסיסי בשגיאה
    error = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error(error);
  }

  // סינון ארבעת המוצרים הראשונים להצגה בדף הבית כ"מוצרים אחרונים"
  // כפי שנראה בסקיצה
  const latestProducts = products.slice(0, 4); 

  return (
    // נניח שאת ה-Header נטען מתוך ה-layout.tsx או נייבא אותו לכאן לפי הצורך
    // בהתאם לסקיצה, נניח שה-Header הוא חלק מה-Layout
    <main>
        {/* קומפוננטת לוגו וניווט ראשית - נשתמש בה כאן לשם הפשטות, 
            אך מקומה האידיאלי הוא ב-layout.tsx */}
        <Header /> 

        {/* לוגו מרכזי ותמונת המותג (אפשר להשתמש בתגית <img> זמנית אם אין לכם את הקבצים) */}
        <section className="hero-section" style={{ textAlign: 'center', margin: '40px 0' }}>
            {/*  */}
            {/* שימו לב: יש להשתמש בקובץ הלוגו שלכם! */}
            <h1>THE MILK & HONEY DISTILLERY</h1>
            {/* אפשר להוסיף כאן לוגו עם next/image */}
        </section>

        {/* הצגת המוצרים האחרונים */}
        <section className="latest-products">
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>LATEST PRODUCTS</h2>
            
            {error && <p className="error-message">Error: {error}</p>}

            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              {latestProducts.map((product) => (
                // מעבירים את כל אובייקט המוצר לקומפוננטת ProductCard
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        </section>
    </main>
  );
}