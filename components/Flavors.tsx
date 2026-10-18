"use client";

import { motion } from "framer-motion";

const flavors = [
  {
    number: "01",
    title: "Le feu lent",
    text: "Des piments rouges séchés, fumés pendant douze heures. La chaleur monte doucement, puis reste en bouche.",
    accent: "Fumé · Poivré",
  },
  {
    number: "02",
    title: "La nuit noire",
    text: "Ail noir fermenté soixante jours. Doux, presque balsamique, avec une profondeur qui s'installe au fil des bouchées.",
    accent: "Umami · Miel",
  },
  {
    number: "03",
    title: "Le choc tropical",
    text: "Habanero frais contre la mangue mûre. Un premier coup de fruit, puis une chaleur franche qui réveille tout.",
    accent: "Fruité · Vif",
  },
];

export default function Flavors() {
  return (
    <section id="saveurs" className="bg-coal py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-16 text-xs font-bold uppercase tracking-[0.3em] text-flame">02 — Saveurs</p>

        <div className="flex flex-col gap-28">
          {flavors.map((flavor, index) => {
            const fromLeft = index % 2 === 0;
            return (
              <motion.div
                key={flavor.number}
                initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-10 md:grid-cols-2 ${fromLeft ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                <div className="font-display text-[clamp(8rem,22vw,18rem)] leading-none text-cream/10 transition-colors hover:text-flame/40">
                  {flavor.number}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-flame">{flavor.accent}</p>
                  <h3 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
                    {flavor.title}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-cream/65">{flavor.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
