"use client";

import { motion } from "framer-motion";

const ingredients = [
  { name: "Piment rouge fumé", origin: "Espagne", detail: "Séché et fumé au bois de hêtre." },
  { name: "Ail noir", origin: "Drôme", detail: "Fermenté 60 jours à 70 °C." },
  { name: "Miel de châtaignier", origin: "Cévennes", detail: "Récolté en fin d'été, non chauffé." },
  { name: "Vinaigre de cidre", origin: "Normandie", detail: "Vieilli en fût de chêne." },
];

export default function Ingredients() {
  return (
    <section id="ingredients" className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-flame">03 — Ingrédients</p>
      <h2 className="mb-16 font-display text-[clamp(3.5rem,9vw,8rem)] uppercase leading-[0.85]">
        Rien à <span className="text-flame">cacher</span>
      </h2>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 md:grid-cols-2 lg:grid-cols-4"
      >
        {ingredients.map((item, index) => (
          <motion.li
            key={item.name}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ backgroundColor: "rgba(255, 90, 0, 0.12)" }}
            className="flex flex-col gap-4 bg-ink p-8 transition-colors"
          >
            <span className="font-display text-5xl text-flame">0{index + 1}</span>
            <h3 className="font-display text-2xl uppercase leading-tight">{item.name}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-cream/50">{item.origin}</p>
            <p className="text-sm leading-relaxed text-cream/65">{item.detail}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
