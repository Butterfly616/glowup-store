import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import banner1 from "@/assets/banner-1.jpg";
import bannerMen from "@/assets/banner-men.jpg";
import bannerWomen from "@/assets/banner-women.jpg";
import bannerBeauty from "@/assets/banner-beauty.jpg";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const trending = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-6">
          <div className="relative rounded-2xl overflow-hidden gradient-hero shadow-glow">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-14 text-primary-foreground">
                <span className="inline-block bg-background/20 backdrop-blur text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  Mega Glow Sale
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  Up to <span className="text-yellow-200">70% OFF</span><br />
                  on Fashion & Beauty
                </h1>
                <p className="text-lg opacity-90 mb-6 max-w-md">
                  Refresh your closet with the season's hottest trends. Free shipping on orders above ₹999.
                </p>
                <Link
                  to="/category/women"
                  className="inline-flex items-center gap-2 bg-background text-primary font-semibold px-6 py-3 rounded-full hover:shadow-glow transition-smooth"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative h-64 md:h-[480px]">
                <img src={banner1} alt="Fashion sale" className="w-full h-full object-cover" width={1600} height={800} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer strip */}
      <section className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Flat 50% OFF", sub: "Men's Wear" },
            { label: "60% OFF", sub: "Dresses" },
            { label: "70% OFF", sub: "Beauty" },
            { label: "Free Shipping", sub: "Above ₹999" },
          ].map((o) => (
            <div key={o.label} className="gradient-soft rounded-xl p-4 text-center border border-border">
              <p className="text-base md:text-lg font-bold text-gradient">{o.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{o.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: "men", label: "Men", img: bannerMen, tag: "Min. 50% OFF" },
            { key: "women", label: "Women", img: bannerWomen, tag: "Up to 60% OFF" },
            { key: "beauty", label: "Beauty", img: bannerBeauty, tag: "Up to 70% OFF" },
          ].map(c => (
            <Link
              key={c.key}
              to={`/category/${c.key}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4] shadow-card hover:shadow-glow transition-smooth"
            >
              <img src={c.img} alt={c.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <p className="text-xs uppercase tracking-widest opacity-90">{c.tag}</p>
                <h3 className="text-3xl font-bold mt-1">{c.label}</h3>
                <span className="inline-flex items-center gap-1 text-sm font-semibold mt-2 group-hover:gap-2 transition-smooth">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 mt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
            <p className="text-sm text-muted-foreground mt-1">Pieces everyone's loving this week</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Index;
