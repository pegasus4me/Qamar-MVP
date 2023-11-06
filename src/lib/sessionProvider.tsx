'use client'
import { SessionProvider, getSession } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
Provider.getInitialProps = async (context : any) => {
  const { ctx } = context;
  const session = await getSession(ctx);

  return {
    session,
  };
};

export default Provider;
