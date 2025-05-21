"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Update active section based on scroll position
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "testimonials", "contact"]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b border-border/40" : "bg-transparent"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="#home" className="flex items-center gap-2">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            MS
          </motion.div>
          <motion.span
            className="text-xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Muhammad Saeed
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.href.substring(1) ? "text-primary" : ""
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild className="group relative overflow-hidden">
              <Link href="#contact">
                <span className="relative z-10">Hire Me</span>
                <span className="absolute inset-0 bg-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
              </Link>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-lg font-medium transition-colors hover:text-primary ${
                    activeSection === item.href.substring(1) ? "text-primary" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="mt-4" asChild>
                <Link href="#contact">Hire Me</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
