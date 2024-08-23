"use client"
import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const SessionWrapper = ({ children }) => {
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
