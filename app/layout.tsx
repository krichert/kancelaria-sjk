import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FontLoader from "@/components/FontLoader";
import FontSwitcher from "@/components/FontSwitcher";
import GoogleFontsLoader from "@/components/GoogleFontsLoader";

export const metadata: Metadata = {
  title: "Kancelaria SJK",
  description: "Strona informacyjna i blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="font-light antialiased">
        <GoogleFontsLoader />
        <FontLoader />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FontSwitcher />
      </body>
    </html>
  );
}
