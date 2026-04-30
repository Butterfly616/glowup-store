import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product, discountPct } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleWishlist, inWishlist } = useShop();
  const wished = inWishlist(product.id);
  const off = discountPct(product);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-glow transition-smooth block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {off > 0 && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            {off}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background transition-smooth"
          aria-label="Wishlist"
        >
          <Heart className={cn("w-4 h-4", wished ? "fill-primary text-primary" : "text-foreground")} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{product.brand}</h3>
        <p className="text-sm text-muted-foreground truncate">{product.title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold">₹{product.price}</span>
          {off > 0 && (
            <>
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
              <span className="text-xs font-semibold text-discount">({off}% OFF)</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
