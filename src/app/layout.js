import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/Navbar";
import { ProductsProvider } from "@/lib/context/ProductProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Minotaur Supps",
  description: "Minotaur Supps - Fuel Your Inner Beast",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap`}
        />
      </head>

      <body className='bg-black'>
        <ProductsProvider>
          <NavBar />
          {children}
        </ProductsProvider>
      </body>
    </html>
  );
}
