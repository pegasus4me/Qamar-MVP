"use client";
export const dynamic = "force-dynamic";
// import Provider from "@/lib/sessionProvider";
import { ContextProvider } from "@/lib/contexProvider";
import { useState } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState<string | undefined>();

  return (
    <>
      <ContextProvider.Provider value={{ date, setDate }}>
        {children}
      </ContextProvider.Provider>
    </>
  );
}
