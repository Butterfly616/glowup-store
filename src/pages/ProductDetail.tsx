import { useParams, Link, useNavigate } from "react-router-dom";
import { products, discountPct } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Heart, ShoppingBag, Truck, ShieldCheck, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, inWishlist } = useShop();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Go home</Link>
      </div>
    );
  }

  const off = discountPct(product);
  const wished = inWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-muted rounded-2xl overflow-hidden aspect-[3/4] max-w-lg">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">{product.brand}</h2>
          <h1 className="text-2xl text-muted-foreground mt-1">{product.title}</h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              {product.rating} <Star className="w-3 h-3 fill-current" />
            </span>
            <span className="text-sm text-muted-foreground">| {Math.floor(Math.random() * 2000) + 500} ratings</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {off > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                <span className="text-lg font-semibold text-discount">({off}% OFF)</span>
              </>
            )}
          </div>
          <p className="text-sm text-success mt-1">inclusive of all taxes</p>

          <p className="text-foreground/80 mt-6 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              size="lg"
              className="flex-1 gradient-primary text-primary-foreground font-semibold hover:shadow-glow"
              onClick={() => { addToCart(product); toast.success("Added to bag"); }}
            >
              <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => { toggleWishlist(product); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
            >
              <Heart className={cn("w-4 h-4 mr-2", wished && "fill-primary text-primary")} />
              {wished ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>

          <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-primary" /> Free shipping on orders above ₹999</div>
            <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-primary" /> 7-day easy return & exchange</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
