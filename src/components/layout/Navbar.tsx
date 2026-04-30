import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, LogOut, X } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";
import { categories } from "@/data/products";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { cartCount, wishlist } = useShop();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold uppercase tracking-wide transition-smooth hover:text-primary ${
      isActive ? "text-primary" : "text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 h-16 flex items-center gap-4">
        {/* Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 -ml-2" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <div className="mt-8 space-y-6">
              <Link to="/" className="text-2xl font-bold text-gradient block">GlowUp Closet</Link>
              {Object.entries(categories).map(([key, cat]) => (
                <div key={key}>
                  <Link to={`/category/${key}`} className="text-lg font-semibold text-foreground hover:text-primary">
                    {cat.label}
                  </Link>
                  <ul className="mt-2 ml-3 space-y-2">
                    {cat.subs.map(sub => (
                      <li key={sub}>
                        <Link to={`/category/${key}?sub=${sub}`} className="text-sm text-muted-foreground hover:text-primary">
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-gradient">GlowUp Closet</h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 ml-6">
          <NavLink to="/category/men" className={navLinkClass}>Men</NavLink>
          <NavLink to="/category/women" className={navLinkClass}>Women</NavLink>
          <NavLink to="/category/beauty" className={navLinkClass}>Beauty</NavLink>
        </nav>

        {/* Search */}
        <form onSubmit={onSearch} className="flex-1 max-w-md mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full pl-10 pr-4 h-10 rounded-lg bg-muted border border-transparent focus:bg-background focus:border-primary focus:outline-none transition-smooth text-sm"
            />
          </div>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-1 md:gap-3 ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col items-center px-2 py-1 hover:text-primary transition-smooth">
                <User className="w-5 h-5" />
                <span className="text-[10px] hidden md:block font-semibold">Profile</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                  <Heart className="w-4 h-4 mr-2" /> Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/cart")}>
                  <ShoppingBag className="w-4 h-4 mr-2" /> Cart
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="flex flex-col items-center px-2 py-1 hover:text-primary transition-smooth">
              <User className="w-5 h-5" />
              <span className="text-[10px] hidden md:block font-semibold">Login</span>
            </Link>
          )}

          <Link to="/wishlist" className="relative flex flex-col items-center px-2 py-1 hover:text-primary transition-smooth">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] hidden md:block font-semibold">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative flex flex-col items-center px-2 py-1 hover:text-primary transition-smooth">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] hidden md:block font-semibold">Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={onSearch} className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 h-10 rounded-lg bg-muted border border-transparent focus:bg-background focus:border-primary focus:outline-none text-sm"
          />
        </div>
      </form>
    </header>
  );
};

export default Navbar;
