export const dynamic = "force-dynamic"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header.component";
import "./globals.css";
import Provider from "@/lib/sessionProvider";
import Strip from "./_components/strip";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qamar",
  description: "Qamar studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          <Strip/>
          {children}
          {/* footer */}
        </Provider>
      </body>
    </html>
  );
}
