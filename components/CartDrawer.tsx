"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart-context";

export default function CartDrawer() {
  const { items, total, count, isOpen, setOpen, remove } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-cream/10 bg-coal p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-4xl uppercase">Panier ({count})</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer text-xs font-bold uppercase tracking-widest text-cream/60 hover:text-flame"
              >
                Fermer
              </button>
            </div>

            <ul className="mt-8 flex flex-1 flex-col gap-4 overflow-y-auto">
              <AnimatePresence initial={false}>
                {items.map(({ product, quantity }) => (
                  <motion.li
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex items-center justify-between rounded-2xl border border-cream/10 p-4"
                  >
                    <div>
                      <p className="font-display text-xl uppercase">{product.name}</p>
                      <p className="text-xs text-cream/50">
                        {quantity} × {product.price.toFixed(2)} €
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="cursor-pointer text-xs font-bold uppercase tracking-wider text-cream/50 hover:text-flame"
                    >
                      Retirer
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
              {items.length === 0 && <p className="text-sm text-cream/50">Votre panier est vide pour l&apos;instant.</p>}
            </ul>

            <div className="mt-8 border-t border-cream/10 pt-6">
              <div className="flex items-center justify-between font-display text-3xl uppercase">
                <span>Total</span>
                <span className="text-flame">{total.toFixed(2)} €</span>
              </div>
              <button
                type="button"
                disabled
                className="mt-6 w-full rounded-full bg-flame py-4 text-sm font-black uppercase tracking-wide text-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                Paiement bientôt disponible
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
