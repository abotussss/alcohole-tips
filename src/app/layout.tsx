import type { Metadata } from "next";
import { Manrope, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const zenOldMincho = Zen_Old_Mincho({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Alcohol Atlas",
    template: "%s",
  },
  description:
    "日本酒とワインを中心に、ブランドや品種、製法、味の特徴をビジュアルで比較できるWebアプリ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${manrope.variable} ${zenOldMincho.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
