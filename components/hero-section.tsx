"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import { Hero3DScene } from "@/components/3d-hero-scene"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })

      // Create a timeline for text reveal animation
      const textReveal = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      })

      textReveal.to(".reveal-text", {
        backgroundPositionX: "0%",
        stagger: 0.5,
        duration: 1,
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom center",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <Hero3DScene />

      <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            className="mb-4 inline-block overflow-hidden rounded-full bg-primary/10 px-4 py-1.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-primary">Software Developer & Designer</span>
          </motion.div>

          <motion.h1
            ref={headingRef}
            className="mb-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="reveal-text bg-gradient-to-r from-primary to-primary bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-2 transition-all duration-500">
              Crafting
            </span>{" "}
            <span className="reveal-text bg-gradient-to-r from-primary via-primary to-primary bg-[length:0%_100%] bg-left-bottom bg-no-repeat pb-2 transition-all duration-500">
              Digital Experiences
            </span>{" "}
            <span className="reveal-text bg-gradient-to-r from-primary to-primary bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-2 transition-all duration-500">
              with Modern Technologies
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I build exceptional and scalable web and mobile applications with cutting-edge technologies and a focus on
            user experience.
          </motion.p>

          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" asChild className="group relative overflow-hidden">
              <Link href="#projects">
                <span className="relative z-10 flex items-center">
                  View My Work{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute bottom-0 left-0 h-0 w-full bg-primary-foreground transition-all duration-300 group-hover:h-full opacity-10"></span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group relative overflow-hidden">
              <Link href="#contact">
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button variant="ghost" size="icon" asChild className="group">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="group">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="group">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="mb-2 text-sm text-muted-foreground">Scroll Down</p>
          <motion.div
            className="h-10 w-6 rounded-full border-2 border-primary/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <motion.div
              className="mx-auto mt-2 h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
