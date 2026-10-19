import CartProvider from "@/app/context/CartContext";
import type { ReactNode } from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
   title: {
       default: "Sla Design Shop",
       template: "%s | Sla Design Shop"
    },
    description: "Discover exquisite handcrafted fashion details for women and girls at Sladesignshop. Explore our curated collection of unique accessories, meticulously created to elevate your style. Shop now for handmade fashion accents that add a touch of individuality to every outfit.",
    openGraph: {
       images: "https://test.sladesignshop.com/opengraph-image.jpg"
    }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ToastContainer />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
