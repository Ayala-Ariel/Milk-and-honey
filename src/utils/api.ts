export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// הפונקציה הישנה:
export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}


// הפונקציה החדשה: אחזור מוצרים לפי שם קטגוריה
export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  try {
    // ננקה את שם הקטגוריה ונוודא שהוא תואם למה שה-API מצפה
    let category = decodeURIComponent(categoryName).toLowerCase();
    
    // מיפוי שמות קטגוריות
    const categoryMappings: { [key: string]: string } = {
      "men's clothing": "men's clothing",
      "mens clothing": "men's clothing",
      "women's clothing": "women's clothing",
      "womens clothing": "women's clothing",
      "jewelery": "jewelery",
      "electronics": "electronics"
    };

    // נשתמש במיפוי אם קיים
    category = categoryMappings[category] || category;

    // קודם ננסה להביא ספציפית לקטגוריה
    const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (res.ok) {
      const products = await res.json();
      return products;
    }

    // אם נכשל, נביא את כל המוצרים ונסנן
    const allProductsRes = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 }
    });

    if (!allProductsRes.ok) {
      throw new Error('Failed to fetch products');
    }

    const allProducts = await allProductsRes.json();
    return allProducts.filter((product: Product) => 
      product.category.toLowerCase() === category
    );

  } catch (error) {
    console.error('Error fetching products for category:', categoryName, error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product> {
  if (!id || isNaN(id) || id <= 0) {
    throw new Error(`Invalid product id: ${id}`);
  }

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Product not found: ${id}`);
    }
    throw new Error(`Failed to fetch product id: ${id}`);
  }

  const data = await res.json();
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid product data received for id: ${id}`);
  }

  return data;
}