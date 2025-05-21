"use client"

import { useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { InteractiveTimeline } from "@/components/interactive-timeline"

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })

      tl.from(".process-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".process-description",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="process-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My <span className="text-primary">Process</span>
          </h2>
          <p className="process-description mt-4 text-lg text-muted-foreground">
            I follow a structured approach to ensure every project is delivered on time, within budget, and exceeds
            expectations.
          </p>
        </div>

        <div className="mt-16">
          <InteractiveTimeline />
        </div>
      </div>
    </section>
  )
}
