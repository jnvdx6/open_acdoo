'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function NavbarClient({ navItems }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Función para verificar si una ruta está activa, incluyendo rutas anidadas
  const isActiveRoute = (href) => {
    // Si las rutas son exactamente iguales
    if (pathname === href) return true
    // Si href no es la raíz ('/') y pathname comienza con href
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${scrolled ? 'shadow-md' : 'border-b'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-[#FF6B35] hover:opacity-80 transition-opacity">
            ACDOO
          </Link>
          <div className="hidden md:flex items-center justify-center flex-grow">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} active={isActiveRoute(item.href)}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 mt-4">
                    <span className="text-2xl font-bold text-[#FF6B35]">ACDOO</span>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <NavLink key={item.href} href={item.href} active={isActiveRoute(item.href)} mobile>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children, active, mobile }) {
  const baseStyles = "font-medium transition-colors"
  const activeStyles = active 
    ? mobile 
      ? "text-[#FF6B35]" 
      : "text-[#FF6B35] bg-[#FF6B35]/10 rounded-full"
    : "text-muted-foreground hover:text-[#FF6B35]"
  const mobileStyles = mobile ? "text-lg py-2" : "px-4 py-2 mx-1"

  return (
    <Link href={href} className={`${baseStyles} ${activeStyles} ${mobileStyles}`}>
      {children}
    </Link>
  )
}