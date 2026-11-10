import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About, Business, Cases, Contacts, Faq, Footer, MobileBar, Prices, Process, Services } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a href="#services" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Перейти до змісту
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Business />
        <Cases />
        <Prices />
        <Process />
        <About />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
