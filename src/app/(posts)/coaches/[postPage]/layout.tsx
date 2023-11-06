"use client";
export const dynamic = "force-dynamic";
import Provider from "@/lib/sessionProvider";
import { ContextProvider } from "@/lib/contexProvider";
import { useState } from "react";
import { Session } from "inspector";
import { headers } from "next/headers";

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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState<string | undefined>();

  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <ContextProvider.Provider value={{ date, setDate }}>
      {children}
    </ContextProvider.Provider>
  );
}
