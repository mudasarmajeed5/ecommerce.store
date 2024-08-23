'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AdminRoutes = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 

    if (!session) {
      router.push('/login'); 
      return;
    }

    const email = session.user.email;
    if (email !== "mudasarmajeed5@yahoo.com") {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <div className="flex text-black text-2xl justify-center items-center gap-4 min-h-screen"><span className="p-4 border-2 border-black rounded-full animate-spin border-t-white"></span></div>;
  }

  return <>{children}</>;
};
