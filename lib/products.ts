export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heat: number;
  price: number;
  notes: string[];
};

export const products: Product[] = [
  {
    id: "piment-fume",
    name: "Piment Fumé",
    tagline: "Braise lente",
    description:
      "Piments rouges fumés au bois de hêtre, confits dans l'huile d'olive et le vinaigre de cidre.",
    heat: 3,
    price: 9.9,
    notes: ["Fumé", "Poivré", "Sucré"],
  },
  {
    id: "ail-noir-miel",
    name: "Ail Noir au Miel",
    tagline: "Profond & caramélisé",
    description:
      "Ail noir fermenté 60 jours, miel de châtaignier et une pointe de piment doux. Un équilibre sombre et velouté.",
    heat: 1,
    price: 8.5,
    notes: ["Umami", "Miel", "Balsamique"],
  },
  {
    id: "habanero-mangue",
    name: "Habanero Mangue",
    tagline: "Explosion tropicale",
    description:
      "Habanero frais, mangue mûre et citron vert. Une chaleur franche qui s'estompe en fruit.",
    heat: 5,
    price: 10.9,
    notes: ["Fruité", "Vif", "Intense"],
  },
];
