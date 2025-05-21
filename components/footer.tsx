import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-accent/20 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <Link href="#home" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                MS
              </div>
              <span className="text-xl font-bold">Muhammad Saeed</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Software Developer specializing in modern web and mobile applications.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:muhammad.saeed@example.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Muhammad Saeed. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
