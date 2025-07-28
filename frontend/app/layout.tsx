import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Digital Marketing Dashboard",
  description: "Modern dashboard using Next.js + shadcn/ui",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
