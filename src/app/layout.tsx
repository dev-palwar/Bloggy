"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import ResponsiveAppBar from "@/Components/Navbar";
const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
import { ApolloProvider } from "@apollo/client";
import client from "@/API/Apollo/config";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Bloggy",
//   description: "A blogging plateform",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          {pathname !== "/login" && <ResponsiveAppBar />}
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
