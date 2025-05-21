"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function InteractiveTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description:
        "We start by understanding your business goals, challenges, and requirements through in-depth consultations.",
      details: [
        "Stakeholder interviews",
        "Requirements gathering",
        "Technical feasibility assessment",
        "Project scope definition",
      ],
    },
    {
      number: "02",
      title: "Architecture & Design",
      description:
        "Our architects design a robust technical foundation and our designers create intuitive user experiences.",
      details: [
        "System architecture design",
        "Database schema design",
        "UI/UX wireframing and prototyping",
        "Technology stack selection",
      ],
    },
    {
      number: "03",
      title: "Development & Testing",
      description:
        "Our engineers build your solution using agile methodologies, with continuous testing throughout the process.",
      details: [
        "Iterative development cycles",
        "Regular client demos and feedback",
        "Comprehensive testing (unit, integration, system)",
        "Performance optimization",
      ],
    },
    {
      number: "04",
      title: "Deployment & Support",
      description:
        "We ensure a smooth launch and provide ongoing support and maintenance to keep your solution running optimally.",
      details: [
        "Deployment planning and execution",
        "User training and documentation",
        "Post-launch monitoring",
        "Ongoing maintenance and updates",
      ],
    },
  ]

  return (
    <div ref={sectionRef} className="relative space-y-12 md:space-y-0">
      {/* Vertical line connecting timeline items */}
      <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20 md:block" />

      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="timeline-item md:grid md:grid-cols-5 md:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ x: 10 }}
        >
          <div className="md:col-span-1 relative">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground z-10 relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {step.number}
            </motion.div>
            {/* Connecting line from circle to content (visible only on mobile) */}
            <div className="absolute top-12 left-6 h-full w-0.5 bg-primary/20 md:hidden" />
          </div>
          <div className="mt-6 md:col-span-4 md:mt-4 pl-4 md:pl-0">
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {step.details.map((detail, detailIndex) => (
                <motion.div
                  key={detailIndex}
                  className="flex items-start space-x-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-sm">{detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
