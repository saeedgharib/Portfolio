"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoLink: string
  githubLink: string
}

export function ProjectCard({ title, description, image, tags, demoLink, githubLink }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // 3D card tilt effect
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])
  const brightness = useTransform(mouseY, [-100, 100], [1.1, 0.9])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
          z: 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <Card className="premium-gradient-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 gold-border">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>

            <div className="mt-6 flex gap-4">
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <Link href={demoLink}>
                  Live Demo <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="bg-background/40 backdrop-blur-sm border-primary/20"
              >
                <Link href={githubLink}>
                  <Github className="mr-1 h-4 w-4" /> Code
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
