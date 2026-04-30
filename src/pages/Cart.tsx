import { Link } from "react-router-dom";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { cart, updateQty, removeFromCart, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Your bag is empty</h1>
        <p className="text-muted-foreground mt-2">Discover trending styles and add your favourites.</p>
        <Link to="/" className="inline-block mt-6">
          <Button className="gradient-primary text-primary-foreground">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Bag ({cart.length})</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 bg-card rounded-xl shadow-card p-4">
              <Link to={`/product/${product.id}`} className="w-24 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{product.brand}</p>
                    <p className="text-sm text-muted-foreground truncate">{product.title}</p>
                  </div>
                  <button onClick={() => { removeFromCart(product.id); toast.success("Removed"); }} aria-label="Remove">
                    <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
                <p className="font-bold mt-2">₹{product.price} <span className="text-xs text-muted-foreground line-through ml-1">₹{product.originalPrice}</span></p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQty(product.id, qty - 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <button onClick={() => updateQty(product.id, qty + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-card rounded-xl shadow-card p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-semibold uppercase text-sm tracking-wide mb-4">Price Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? "text-success font-semibold" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base">
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>
          <Button className="w-full mt-6 gradient-primary text-primary-foreground" onClick={() => toast.success("Demo: checkout coming soon!")}>
            Place Order
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
