"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface AnimatedSkillBarProps {
  name: string
  level: number
  logo:any
}

export function AnimatedSkillBar({ name, level,logo }: AnimatedSkillBarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const barWidth = useMotionValue(0)
  const barOpacity = useTransform(barWidth, [0, 100], [0.5, 1])
  const barColor = useTransform(
    barWidth,
    [0, 50, 100],
    ["hsl(var(--primary) / 0.7)", "hsl(var(--primary) / 0.8)", "hsl(var(--primary))"],
  )

  return (
    <div className="mb-6" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      
      <div className="mb-2 flex justify-between">
       <Image
                    src={logo}
                    alt="Muhammad Saeed"
                    width={26}
                    height={26}
                    
                    />
        <span className="font-medium">{name}</span>
        <motion.span
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          >
          {level}%
        </motion.span>
      </div>
            
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="absolute h-full"
          style={{
            width: barWidth,
            backgroundColor: barColor,
            opacity: barOpacity,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-0 h-full bg-primary/30"
              initial={{ width: 0, left: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Animated particles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 h-full w-1 bg-primary/80"
                  initial={{
                    left: `${level * Math.random()}%`,
                    opacity: 0,
                    height: "100%",
                  }}
                  animate={{
                    left: `${level * Math.random()}%`,
                    opacity: [0, 1, 0],
                    height: "100%",
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8 + Math.random(),
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
