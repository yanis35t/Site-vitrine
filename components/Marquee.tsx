const items = ["Piment fumé", "Ail noir", "Habanero mangue", "Fermenté lentement", "Sans additifs"];

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div className="w-full max-w-full overflow-hidden bg-flame py-5 text-ink">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-5xl uppercase md:text-7xl">
        {row.map((item, index) => (
          <span key={index} className="flex items-center gap-10">
            {item}
            <span aria-hidden className="text-cream">
              ✺
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
