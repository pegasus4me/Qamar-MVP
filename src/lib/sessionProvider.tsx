'use client'
import { SessionProvider  } from "next-auth/react";
import { Session } from "next-auth";

export interface AuthContextProps {
  children: React.ReactNode;
  session: Session
}
const Provider = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};


export default Provider;
