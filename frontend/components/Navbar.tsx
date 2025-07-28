// components/Navbar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sample Data", href: "/dashboard" },
  { label: "Google API", href: "/google-dashboard" },
  { label: "Facebook API", href: "/facebook-dashboard" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full bg-background border-b px-6 py-4 shadow-sm flex items-center justify-between">
      <div className="text-xl font-bold">AdMyBrand Analytics</div>
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm px-4 py-2 rounded-md hover:bg-muted transition",
              pathname === item.href && "bg-muted font-medium"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
