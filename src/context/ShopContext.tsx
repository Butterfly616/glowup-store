import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/products";

type CartItem = { product: Product; qty: number };

type ShopContextType = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (p: Product) => void;
  inWishlist: (id: string) => boolean;
  cartTotal: number;
  cartCount: number;
};

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("gu_cart") || "[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem("gu_wishlist") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("gu_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("gu_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === p.id);
      if (existing) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  };

  const toggleWishlist = (p: Product) => {
    setWishlist(prev => prev.find(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]);
  };
  const inWishlist = (id: string) => wishlist.some(i => i.id === id);

  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, inWishlist, cartTotal, cartCount }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
};
