"use client";

import { motion } from "framer-motion";
import { useCart } from "@/components/cart-context";

const links = [
  { href: "#histoire", label: "Histoire" },
  { href: "#produits", label: "Sauces" },
  { href: "#saveurs", label: "Saveurs" },
  { href: "#ingredients", label: "Ingrédients" },
];

export default function Nav() {
  const { count, setOpen } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <a href="#top" className="font-display text-2xl tracking-wider text-cream">
        FLAMME<span className="text-flame">®</span>
      </a>

      <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="group relative text-cream/80 transition-colors hover:text-cream">
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-flame transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        ))}
      </nav>

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-colors hover:border-flame hover:text-flame"
        aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
      >
        Panier
        <motion.span
          key={count}
          initial={{ scale: 1.6 }}
          animate={{ scale: 1 }}
          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[10px] font-black text-ink"
        >
          {count}
        </motion.span>
      </motion.button>
    </header>
  );
}
