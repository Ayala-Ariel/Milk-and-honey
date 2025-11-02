'use client'
import { createContext, useContext, useState, useEffect } from 'react'


type Product = {
id: number
title: string
price: number
image: string
}


type WishListContextType = {
wishlist: Product[]
addToWishlist: (p: Product) => void
removeFromWishlist: (id: number) => void
}


const WishListContext = createContext<WishListContextType | undefined>(undefined)


export const WishListProvider = ({ children }: { children: React.ReactNode }) => {
const [wishlist, setWishlist] = useState<Product[]>([])


useEffect(() => {
const saved = localStorage.getItem('wishlist')
if (saved) setWishlist(JSON.parse(saved))
}, [])


useEffect(() => {
localStorage.setItem('wishlist', JSON.stringify(wishlist))
}, [wishlist])


const addToWishlist = (p: Product) => {
setWishlist(prev => prev.find(x => x.id === p.id) ? prev : [...prev, p])
}


const removeFromWishlist = (id: number) => setWishlist(prev => prev.filter(p => p.id !== id))


return (
<WishListContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
{children}
</WishListContext.Provider>
)
}


export const useWishlist = () => {
const context = useContext(WishListContext)
if (!context) throw new Error('useWishlist must be used within WishListProvider')
return context
}