import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { LoadingProvider } from "@/context/Loading";
import Buttons from "@/components/common/Buttons";


const roboto = Roboto({ subsets: ["latin"],weight:"400" });

export const metadata: Metadata = {
  title: "E Store",
  description: "",
};

export const myMenu = [
  {
    title:"Home",
    url:'/'
  },
  {
    title:"Shop",
    url:'/shop'
  },
  {
    title:"About us",
    url:'/about'
  },
  {
    title:"Contact",
    url:'/'
  },

]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CartProvider>
        <LoadingProvider>
        <Navbar logo="/logo.png" menu={myMenu} />
        {children}
        </LoadingProvider>
        <Footer/>
        </CartProvider>
        </body>
    </html>
  );
}
