"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import { Code, Globe, Lightbulb, Smartphone } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { ServiceCard } from "@/components/service-card"

export function AboutSection() {
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

      tl.from(".about-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".about-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".about-image",
          {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".about-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.4",
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: <Code className="h-10 w-10" />,
      title: "Web Development",
      description: "Building responsive and performant web applications with modern frameworks and best practices.",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications with React Native for iOS and Android.",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "API Development",
      description: "Designing and implementing robust APIs that power your applications and services.",
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "AI Integration",
      description: "Incorporating artificial intelligence capabilities into applications for enhanced functionality.",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 premium-gradient-1">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="about-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl premium-text-shadow">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="about-description mt-6 text-lg text-muted-foreground">
              I'm Muhammad Saeed, a passionate software developer with expertise in building modern web and mobile
              applications. With a strong foundation in JavaScript and its ecosystem, I specialize in creating scalable,
              user-friendly applications that solve real-world problems.
            </p>
            <p className="about-description mt-4 text-lg text-muted-foreground">
              My journey in software development has equipped me with a diverse skill set spanning frontend and backend
              technologies. I'm constantly learning and adapting to new technologies to deliver cutting-edge solutions
              for my clients.
            </p>

            <div className="about-image mt-8 relative h-[300px] w-full overflow-hidden rounded-lg lg:hidden glass-card">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Muhammad+Saeed"
                alt="Muhammad Saeed"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="about-image relative hidden h-[500px] overflow-hidden rounded-lg lg:block glass-card">
            <Image
              src="/placeholder.svg?height=600&width=600&text=Muhammad+Saeed"
              alt="Muhammad Saeed"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="about-card">
              <ServiceCard icon={service.icon} title={service.title} description={service.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
