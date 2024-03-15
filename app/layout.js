import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import SessionWrapper from "./component/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoGlow Organics | Nature's Beauty, Naturally Yours",
  description: "Home Accents offers a delightful range of decorations to transform your house into a warm and inviting home. From elegant wall art and stylish vases to charming cushions and soothing candles, our curated collection adds a touch of personality to every room. Discover your decorating style with Home Accents and create a space that truly feels like home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </SessionWrapper>
    </html>
  );
}
