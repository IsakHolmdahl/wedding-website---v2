import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { EB_Garamond, Corinthia } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const corinthia = Corinthia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-corinthia",
});

export const metadata: Metadata = {
  title: "Viktoria & Isaks bröllop",
  description: "Join us as we celebrate our love on August 8, 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`snap-y snap-proximity ${ebGaramond.variable} ${corinthia.variable}`}
    >
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
