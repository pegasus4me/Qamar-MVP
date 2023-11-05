"use client"
import Provider from "@/lib/sessionProvider";
import { ContextProvider } from "@/lib/contexProvider";
import {useState} from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [date, setDate] = useState<string | undefined>()
  return (

      <>
        <Provider>
          <ContextProvider.Provider value={{date, setDate}}>
            {children}
          </ContextProvider.Provider>
          {/* footer */}
        </Provider>
      </>
   
  );
}
