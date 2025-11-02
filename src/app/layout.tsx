import './globals.css'
import { CartProvider } from '../contexts/CartContext'
import { WishListProvider } from '../contexts/WishListContext'
import Header from '../components/header/Header'; 
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<CartProvider>
<WishListProvider>
<Header />
{children}
</WishListProvider>
</CartProvider>
</body>
</html>
)
}