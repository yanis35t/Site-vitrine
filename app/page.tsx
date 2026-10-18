import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import Flavors from "@/components/Flavors";
import Ingredients from "@/components/Ingredients";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <Story />
      <Marquee />
      <Products />
      <Flavors />
      <Ingredients />
      <Footer />
    </main>
  );
}
