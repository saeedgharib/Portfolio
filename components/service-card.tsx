"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  // 3D card tilt effect
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseY, [-100, 100], [7, -7])
  const rotateY = useTransform(mouseX, [-100, 100], [-7, 7])

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
  }

  return (
    <motion.div
      ref={cardRef}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      whileHover={{ translateY: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          z: 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <Card className="premium-gradient-card border-none shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 gold-border">
          <CardHeader>
            <motion.div
              className="mb-2 text-primary"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
