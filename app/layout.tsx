import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
// import Layout from "./components/Layout";

const inter = Inter({ subsets: ["latin"] });
const instrument_sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "devlinks",
  description: "Share your profiles with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrument_sans.className} bg-white md:bg-[#FAFAFA]`}>
        {children}
      </body>
    </html>
  );
}
