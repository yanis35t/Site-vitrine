export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 px-6 pb-10 pt-32 md:px-10">
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap font-display text-[20vw] leading-none text-flame/90">
        FLAMME
      </p>

      <div className="mt-16 flex flex-col justify-between gap-10 md:flex-row">
        <p className="max-w-sm text-sm leading-relaxed text-cream/60">
          Sauces artisanales, petites séries, zéro conservateur. Faites pour les cuisines qui aiment avoir chaud.
        </p>
        <nav className="flex flex-wrap gap-8 text-xs font-bold uppercase tracking-[0.2em] text-cream/70">
          <a href="#produits" className="hover:text-flame">Sauces</a>
          <a href="#saveurs" className="hover:text-flame">Saveurs</a>
          <a href="#ingredients" className="hover:text-flame">Ingrédients</a>
        </nav>
      </div>

      <p className="mt-16 text-xs uppercase tracking-widest text-cream/40">
        © {new Date().getFullYear()} FLAMME. Tous droits réservés.
      </p>
    </footer>
  );
}
