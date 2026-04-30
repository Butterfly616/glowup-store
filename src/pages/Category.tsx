import { useParams, useSearchParams, Link } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [params] = useSearchParams();
  const sub = params.get("sub");

  const cat = category && category in categories ? categories[category as keyof typeof categories] : null;
  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Go home</Link>
      </div>
    );
  }

  let list = products.filter(p => p.category === category);
  if (sub) list = list.filter(p => p.subcategory === sub);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Home / <span className="text-foreground font-medium">{cat.label}</span>
          {sub && <> / <span className="text-foreground font-medium">{sub}</span></>}
        </p>
        <h1 className="text-3xl font-bold mt-2">{sub || cat.label}</h1>
        <p className="text-sm text-muted-foreground mt-1">{list.length} products</p>
      </div>

      {/* Sub-pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          to={`/category/${category}`}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
            !sub ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"
          }`}
        >
          All
        </Link>
        {cat.subs.map(s => (
          <Link
            key={s}
            to={`/category/${category}?sub=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
              sub === s ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No products found in this section.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Category;
