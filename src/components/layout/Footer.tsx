import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-muted mt-16 border-t border-border">
    <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="col-span-2 md:col-span-1">
        <h3 className="text-xl font-bold text-gradient mb-3">GlowUp Closet</h3>
        <p className="text-sm text-muted-foreground">
          Your destination for trendy fashion, beauty and lifestyle. Shop the season's hottest looks with up to 70% off.
        </p>
        <div className="flex gap-3 mt-4">
          <a href="#" aria-label="Instagram" className="hover:text-primary transition-smooth"><Instagram className="w-5 h-5" /></a>
          <a href="#" aria-label="Facebook" className="hover:text-primary transition-smooth"><Facebook className="w-5 h-5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-primary transition-smooth"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm uppercase tracking-wide mb-3">Shop</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/category/men" className="hover:text-primary">Men</Link></li>
          <li><Link to="/category/women" className="hover:text-primary">Women</Link></li>
          <li><Link to="/category/beauty" className="hover:text-primary">Beauty</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-sm uppercase tracking-wide mb-3">Help</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#" className="hover:text-primary">Contact Us</a></li>
          <li><a href="#" className="hover:text-primary">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-primary">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-sm uppercase tracking-wide mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@glowupcloset.com</li>
          <li>+91 98765 43210</li>
          <li>Mumbai, India</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} GlowUp Closet. Crafted with love.
    </div>
  </footer>
);

export default Footer;
