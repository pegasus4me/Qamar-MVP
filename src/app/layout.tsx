export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header.component";
import "./globals.css";
import { headers } from "next/headers";
import Provider from "@/lib/sessionProvider";
import Strip from "./_components/strip";
import Footer from "./_components/footer";
const inter = Inter({ subsets: ["latin"] });
import { Session } from "next-auth";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Qamar",
  description: "Qamar studio",
};

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.LOCAL_AUTH_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider session={session}>
          <Header />
          <Strip />
          {children}
          <Footer />
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
