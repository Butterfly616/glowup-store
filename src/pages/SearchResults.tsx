import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useMemo, useState, useEffect } from "react";

const SearchResults = () => {
  const [params] = useSearchParams();
  const initial = params.get("q") || "";
  const [query, setQuery] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(initial);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [initial]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Search</h1>
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search products, brands, categories..."
        className="w-full max-w-xl mt-4 h-12 px-4 rounded-lg bg-muted border border-border focus:bg-background focus:border-primary focus:outline-none"
        autoFocus
      />
      <p className="text-sm text-muted-foreground mt-3">
        {loading ? "Searching..." : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
      </p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : query ? (
        <div className="py-16 text-center text-muted-foreground">
          No products match your search. Try different keywords.
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
