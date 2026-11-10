import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/MotionProvider";
import { contacts } from "@/content/site";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const michroma = localFont({
  src: "../fonts/Michroma-Regular.ttf",
  variable: "--font-michroma",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hive-intelligence.com.ua";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hive Intelligence — IT-майстер у Дніпрі: ремонт ПК, мережі, відеонагляд",
  description:
    "Ремонт комп'ютерів і принтерів, Wi-Fi та мережі, відеонагляд, резервне живлення та IT-супровід бізнесу й HoReCa у Дніпрі. Ціна до початку робіт, гарантія.",
  keywords: ["ремонт ноутбуків Дніпро", "комп'ютерний майстер Дніпро", "IT аутсорсинг Дніпро", "відеонагляд Дніпро", "заправка картриджів Дніпро"],
  openGraph: {
    title: "Hive Intelligence — IT для дому й бізнесу в Дніпрі",
    description: "Техніка, мережі, відеонагляд, резервне живлення та IT-супровід закладів.",
    locale: "uk_UA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ComputerRepair",
  name: "Hive Intelligence",
  founder: contacts.owner,
  telephone: contacts.phone,
  areaServed: "Дніпро",
  address: { "@type": "PostalAddress", addressLocality: "Дніпро", addressCountry: "UA" },
  sameAs: [contacts.telegramHref],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${michroma.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
