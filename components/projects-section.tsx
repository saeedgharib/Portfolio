"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"

export function ProjectsSection() {
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

      tl.from(".projects-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".projects-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".project-card",
          {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform built with Next.js, MongoDB, and Stripe integration.",
      image: "/projects/flowforge.png",
      tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "AI-Powered Chat Application",
      description: "Real-time chat application with AI integration for smart responses and language translation.",
      image: "/projects/flowforge.png",
      tags: ["React", "Node.js", "Socket.io", "AI Integration"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "Mobile Fitness Tracker",
      description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics.",
      image: "/projects/flowforge.png",
      tags: ["React Native", "Firebase", "Redux", "Health API"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "Dashboard Analytics",
      description: "Interactive dashboard for visualizing business metrics and analytics with real-time updates.",
      image: "/projects/flowforge.png",
      tags: ["React", "D3.js", "PostgreSQL", "Express"],
      demoLink: "#",
      githubLink: "#",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 premium-gradient-1">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="projects-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl premium-text-shadow">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="projects-description mt-4 text-lg text-muted-foreground">
            Here are some of my recent projects that showcase my skills and expertise in different technologies.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="group relative overflow-hidden bg-background/40 backdrop-blur-sm border-primary/20"
          >
            <Link href="#">
              <span className="relative z-10">View All Projects</span>
              <span className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
