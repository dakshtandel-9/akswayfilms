import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aksway Photography | Wedding Photography in Honnavar",
  description:
    "Professional wedding photography in Honnavar, Karnataka. Candid, traditional, and cinematic coverage for your special day.",
  keywords: [
    "wedding photography Honnavar",
    "candid photographer Karnataka",
    "wedding photographer Honnavar",
    "Aksway Photography",
  ],
  openGraph: {
    title: "Aksway Photography | Wedding Photography in Honnavar",
    description: "Professional wedding photography in Honnavar, Karnataka.",
    url: "https://aksway.in",
    siteName: "Aksway Photography",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "https://res.cloudinary.com/dlk0wvka6/image/upload/v1777889152/aksway_h8rcff.png",
    shortcut: "https://res.cloudinary.com/dlk0wvka6/image/upload/v1777889152/aksway_h8rcff.png",
    apple: "https://res.cloudinary.com/dlk0wvka6/image/upload/v1777889152/aksway_h8rcff.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased`}
      >
        <Loader />
        <Header />
        {children}
      </body>
    </html>
  );
}
