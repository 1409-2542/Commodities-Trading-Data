import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Commodities Trading Data",
  description: "Commodity prices and info",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-50 to-blue-50 text-gray-800">
      <div className="p-8 space-y-12">
        <Header />
        <main>{children}</main>
        <Footer />
        </div>
      </body>
    </html>
  )
}

