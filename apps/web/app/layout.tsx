import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local"

const editorialNew = localFont({
  src: "./fonts/PPEditorialNew-Ultralight-BF644b21500d0c0.otf",
  variable: "--font-editorial",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guardium",
  description: "API monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${spaceMono.variable} ${editorialNew.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}