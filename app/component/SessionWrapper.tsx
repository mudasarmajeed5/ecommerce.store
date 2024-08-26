'use client'
import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
interface SessionWrapperProps{
    children:React.ReactNode
}
const SessionWrapper:React.FC<SessionWrapperProps> = ({children}) => {
    const path = usePathname();
    const isAdminPath = path.startsWith('/admin');
  return (
    <SessionProvider>
      {!isAdminPath && <Navbar />}
      <main>{children}</main>
      {!isAdminPath && <Footer />}
    </SessionProvider>
  )
}

export default SessionWrapper