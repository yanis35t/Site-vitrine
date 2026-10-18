"use client";

import { motion } from "framer-motion";
import { useCart } from "@/components/cart-context";
import { products, type Product } from "@/lib/products";

function HeatMeter({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Niveau de piquant ${level} sur 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`h-2 w-6 rounded-full ${index < level ? "bg-flame" : "bg-cream/15"}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group flex flex-col rounded-[2rem] border border-cream/10 bg-coal p-8 transition-colors hover:border-flame/60"
    >
      <div className="relative mx-auto mb-8 flex h-64 w-44 items-end justify-center">
        <div className="absolute inset-0 rounded-[45%_45%_40%_40%/30%_30%_40%_40%] bg-gradient-to-b from-flame/40 via-flame/20 to-transparent blur-2xl transition-opacity group-hover:opacity-100" />
        <div className="relative h-full w-full rounded-[45%_45%_40%_40%/30%_30%_40%_40%] border border-cream/30 bg-gradient-to-b from-cream/10 via-flame/60 to-flame/90 shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]">
          <div className="absolute -top-4 left-1/2 h-6 w-20 -translate-x-1/2 rounded-md bg-ink" />
          <div className="absolute bottom-10 left-1/2 flex h-28 w-full -translate-x-1/2 flex-col items-center justify-center gap-1 bg-ink px-2 text-center">
            <span className="font-display text-2xl leading-none text-flame">FLAMME</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-cream/80">{product.name}</span>
          </div>
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.25em] text-flame">{product.tagline}</p>
      <h3 className="mt-2 font-display text-4xl uppercase leading-none">{product.name}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/65">{product.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {product.notes.map((note) => (
          <span key={note} className="rounded-full border border-cream/15 px-3 py-1 text-[11px] uppercase tracking-wider text-cream/70">
            {note}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cream/50">Piquant</span>
          <HeatMeter level={product.heat} />
        </div>
        <motion.button
          type="button"
          onClick={() => add(product)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="cursor-pointer rounded-full bg-cream px-5 py-3 text-xs font-black uppercase tracking-wide text-ink transition-colors hover:bg-flame"
        >
          {product.price.toFixed(2)} € — Ajouter
        </motion.button>
      </div>
    </motion.article>
  );
}

export default function Products() {
  return (
    <section id="produits" className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="font-display text-[clamp(4rem,12vw,11rem)] uppercase leading-[0.85]">
          Nos <span className="text-flame">sauces</span>
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-cream/60">
          Trois recettes, toutes faites à la main en petites séries. Pas de conservateurs, pas de raccourcis.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
