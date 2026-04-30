import { Link } from "react-router-dom";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Your wishlist is empty</h1>
        <p className="text-muted-foreground mt-2">Tap the heart on any product to save it here.</p>
        <Link to="/" className="inline-block mt-6">
          <Button className="gradient-primary text-primary-foreground">Start Exploring</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Wishlist;
