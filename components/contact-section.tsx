"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"


export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

      tl.from(".contact-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".contact-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".contact-info",
          {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".contact-form",
          {
            x: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8",
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  // Floating label animation variants
  const labelVariants = {
    focus: { y: -25, scale: 0.8, color: "hsl(var(--primary))" },
    blur: (hasValue: boolean) => ({
      y: hasValue ? -25 : 0,
      scale: hasValue ? 0.8 : 1,
      color: hasValue ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
    }),
  }

  return (
    <section id="contact" ref={sectionRef} className="premium-gradient-1 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="contact-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl premium-text-shadow">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="contact-description mt-4 text-lg text-muted-foreground">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Card className="contact-info premium-gradient-card border-none shadow-md backdrop-blur-sm gold-border">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">msaeedgharib@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+92 318-7867842</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 rounded-lg bg-background/40 backdrop-blur-sm p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="mb-2 font-medium">Availability</h3>
                <p className="text-muted-foreground">
                  I'm currently available for freelance work and open to discussing new opportunities.
                </p>
              </motion.div>
            </CardContent>
          </Card>

          <Card className="contact-form premium-gradient-card border-none shadow-md gold-border">
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center space-y-4 py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Send className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-center text-muted-foreground">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="bg-background/40 backdrop-blur-sm border-primary/20"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative space-y-2 mt-2">
                      <motion.div
                        initial="blur"
                        animate={formValues.name ? "focus" : "blur"}
                        variants={labelVariants}
                        custom={!!formValues.name}
                        className="absolute left-3 top-3 origin-left"
                      >
                        <Label htmlFor="name">Name</Label>
                      </motion.div>
                      <Input
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        className="pt-6 bg-background/40 backdrop-blur-sm border-primary/20"
                        required
                      />
                    </div>
                    <div className="relative space-y-2">
                      <motion.div
                        initial="blur"
                        animate={formValues.email ? "focus" : "blur"}
                        variants={labelVariants}
                        custom={!!formValues.email}
                        className="absolute left-3 top-3 origin-left"
                      >
                        <Label htmlFor="email">Email</Label>
                      </motion.div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        className="pt-6 bg-background/40 backdrop-blur-sm border-primary/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative space-y-2">
                    <motion.div
                      initial="blur"
                      animate={formValues.subject ? "focus" : "blur"}
                      variants={labelVariants}
                      custom={!!formValues.subject}
                      className="absolute left-3 top-3 origin-left"
                    >
                      <Label htmlFor="subject">Subject</Label>
                    </motion.div>
                    <Input
                      id="subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleChange}
                      className="pt-6 bg-background/40 backdrop-blur-sm border-primary/20"
                      required
                    />
                  </div>

                  <div className="relative space-y-2">
                    <motion.div
                      initial="blur"
                      animate={formValues.message ? "focus" : "blur"}
                      variants={labelVariants}
                      custom={!!formValues.message}
                      className="absolute left-3 top-3 origin-left"
                    >
                      <Label htmlFor="message">Message</Label>
                    </motion.div>
                    <Textarea
                      id="message"
                      name="message"
                      value={formValues.message}
                      onChange={handleChange}
                      className="min-h-[120px] pt-6 bg-background/40 backdrop-blur-sm border-primary/20"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-1 w-0 bg-primary-foreground"
                      animate={{ width: isSubmitting ? "100%" : "0%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
     
    </section>
  )
}
