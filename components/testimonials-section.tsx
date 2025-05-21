"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

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

      tl.from(".testimonials-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".testimonials-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".testimonial-card",
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

  const testimonials = [
    {
      quote:
        "Muhammad is an exceptional developer who delivered our project ahead of schedule. His expertise in React and Next.js was evident in the high-quality code and smooth user experience.",
      name: "Sarah Johnson",
      title: "CTO, TechStart Inc.",
      image: "/placeholder.svg?height=80&width=80&text=SJ",
    },
    {
      quote:
        "Working with Muhammad was a pleasure. He understood our requirements perfectly and implemented complex features with ease. His knowledge of full-stack development made our project a success.",
      name: "David Chen",
      title: "Product Manager, InnovateCorp",
      image: "/placeholder.svg?height=80&width=80&text=DC",
    },
    {
      quote:
        "Muhammad's ability to integrate AI features into our application was impressive. He's not just a developer but a problem solver who brings valuable insights to the table.",
      name: "Emily Rodriguez",
      title: "Founder, AI Solutions",
      image: "/placeholder.svg?height=80&width=80&text=ER",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="testimonials" ref={sectionRef} className="premium-gradient-2 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="testimonials-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl premium-text-shadow">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="testimonials-description mt-4 text-lg text-muted-foreground">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        <div className="testimonial-card mt-16">
          <Card className="mx-auto max-w-4xl border-none premium-gradient-card shadow-lg backdrop-blur-sm gold-border">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-primary/20" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 space-y-6"
                >
                  <p className="text-xl md:text-2xl">{testimonials[activeIndex].quote}</p>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="h-12 w-12 overflow-hidden rounded-full"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-bold">{testimonials[activeIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[activeIndex].title}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="group relative overflow-hidden bg-background/40 backdrop-blur-sm border-primary/20"
            >
              <span className="relative z-10">
                <ChevronLeft className="h-4 w-4" />
              </span>
              <span className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="group relative overflow-hidden bg-background/40 backdrop-blur-sm border-primary/20"
            >
              <span className="relative z-10">
                <ChevronRight className="h-4 w-4" />
              </span>
              <span className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
