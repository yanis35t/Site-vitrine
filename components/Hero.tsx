"use client";

import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart-context";
import { products } from "@/lib/products";
import type { Progress } from "@/components/SauceJar";

const SauceJar = dynamic(() => import("@/components/SauceJar"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useMemo<Progress>(() => ({ current: 0 }), []);
  const { add } = useCart();
  const featured = products[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the hero while the user scrolls; the jar turns with the scroll progress
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      // Giant type drifts apart as the user scrolls
      gsap.to(".hero-word-left", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "+=120%", scrub: true },
      });
      gsap.to(".hero-word-right", {
        xPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "+=120%", scrub: true },
      });

      gsap.from(".hero-jar", {
        y: 120,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, [progress]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center">
        <div className="hero-word-left whitespace-nowrap font-display text-[24vw] leading-[0.8] text-flame">
          FLAM
        </div>
        <div className="hero-word-right whitespace-nowrap text-right font-display text-[24vw] leading-[0.8] text-cream">
          ME
        </div>
      </div>

      <div className="hero-jar absolute inset-0 z-10">
        <SauceJar progress={progress} />
      </div>

      <div className="absolute left-6 top-28 z-20 text-xs font-bold uppercase tracking-[0.3em] text-flame md:left-10">
        Édition piquante · N°01
      </div>

      <div className="absolute bottom-10 left-6 right-6 z-20 flex flex-col items-start justify-between gap-6 md:left-10 md:right-10 md:flex-row md:items-end">
        <p className="max-w-xs text-sm leading-relaxed text-cream/70 md:text-base">
          Des sauces fermentées lentement, au feu de bois. Trois recettes, une seule obsession : la profondeur.
        </p>

        <motion.button
          type="button"
          onClick={() => add(featured)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-full bg-flame px-8 py-4 text-sm font-black uppercase tracking-wide text-ink shadow-[0_0_40px_-5px_rgba(255,90,0,0.7)] transition-shadow hover:shadow-[0_0_60px_-5px_rgba(255,90,0,0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
        >
          Ajouter {featured.name} · {featured.price.toFixed(2)} €
        </motion.button>
      </div>
    </section>
  );
}
