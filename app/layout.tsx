import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });
import SessionWrapper from "./component/SessionWrapper";
export const metadata = {
  title: "EcoGlow Organics | Nature's Beauty, Naturally Yours",
  description: "Home Accents offers a delightful range of decorations to transform your house into a warm and inviting home. From elegant wall art and stylish vases to charming cushions and soothing candles, our curated collection adds a touch of personality to every room. Discover your decorating style with Home Accents and create a space that truly feels like home",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </body>
      </html>
    </ReduxProvider>
  );
}
