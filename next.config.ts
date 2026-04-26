import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Erlaubt die `quality`-Werte, die wir bei <Image /> setzen (Next 16 Standard nur [75]). */
    qualities: [75, 82, 85, 88, 100],
    /** In der Entwicklung schneller neue Assets nach Datei-Tausch (Hero etc.). */
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 14400,
  },
};

export default nextConfig;
