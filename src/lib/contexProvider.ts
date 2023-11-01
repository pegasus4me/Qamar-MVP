"use client"
import { createContext } from "react";
export type IDateContext = {
  date: string | undefined,
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>
};
export const ContextProvider = createContext<IDateContext>({
    date : "",
    setDate : () => null
});
