import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

export const metadata: Metadata = {
  title: "RoadReady - Tsindira Provisoire",
  description: "Minuza amategeko y'umuhanda ukoresheje telefoni yawe",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="rw">
      <body className={`${rubik.variable} font-rubik antialiased`}>{children}</body>
    </html>
  );
}
