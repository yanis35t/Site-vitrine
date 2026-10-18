"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words =
  "Chaque bouteille commence par un feu de bois, une marmite de piments et deux mois de patience. Rien n'est pressé. Tout est goûté. Le résultat : une sauce qui réveille, puis qui reste.".split(
    " ",
  );

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Words light up one by one as the reader scrolls through the section
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="histoire" ref={sectionRef} className="relative mx-auto max-w-6xl px-6 py-40 md:px-10">
      <p className="mb-10 text-xs font-bold uppercase tracking-[0.3em] text-flame">01 — Histoire</p>
      <p className="font-display text-[clamp(2.2rem,5.5vw,5rem)] uppercase leading-[1.05] text-cream">
        {words.map((word, index) => (
          <span key={index} className="story-word inline-block pr-[0.3em]">
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
