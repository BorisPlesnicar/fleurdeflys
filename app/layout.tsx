import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FLEUR DE LYS — Desert Whisper N° 114 · A scent of quiet luxury",
  description:
    "FLEUR DE LYS ist ein französisches Luxus-Parfumhaus. Entdecken Sie Desert Whisper N° 114 – ein rauchiger Oud-Extrait, inspiriert von der mystischen Tiefe der Wüste.",
  icons: {
    icon: "/images/logotransparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-onyx antialiased">
        {children}
      </body>
    </html>
  );
}
