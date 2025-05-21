"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSkillBar } from "@/components/animated-skill-bar"


export function SkillsSection() {
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

      tl.from(".skills-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".skills-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".skills-tabs",
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

  const skills = {
    languages: [
      { name: "JavaScript", level: 95,logo:'/techlogo/js.png' },
      { name: "TypeScript", level: 85 ,logo:'/techlogo/typescript.png'},
      { name: "HTML", level: 90,logo:'/techlogo/HTML5.png' },
      { name: "CSS", level: 90 ,logo:'/techlogo/CSS3.png'},
    ],
    frameworks: [
      { name: "React", level: 95,logo:'/techlogo/atom.png' },
      { name: "Next.js", level: 90 ,logo:'/techlogo/nextjs-icon.png'},
      { name: "React Native", level: 85,logo:'/techlogo/atom.png' },
      { name: "MERN Stack", level: 90,logo:'/techlogo/js.png' },
      { name: "Tailwind CSS", level: 95 ,logo:'/techlogo/Tailwind CSS.png'},
    ],
    databases: [
      { name: "MongoDB", level: 90 ,logo:'/techlogo/mongodb.png'},
      { name: "SQL", level: 85 ,logo:'/techlogo/sql.png'},
      { name: "PostgreSQL", level: 85 ,logo:'/techlogo/postgres.png'},
      { name: "Firebase", level: 90,logo:'/techlogo/firebase.png' },
    ],
    specialties: [
      { name: "AI Integration", level: 85,logo:'/techlogo/microchip.png' },
      { name: "API Development", level: 90 ,logo:'/techlogo/api.png'},
      { name: "Responsive Design", level: 95 ,logo:'/techlogo/cross-platform.png'},
      { name: "Performance Optimization", level: 85 ,logo:'/techlogo/performance.png'},
    ],
  }

  return (
    <section id="skills" ref={sectionRef} className="premium-gradient-2 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="skills-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl premium-text-shadow">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="skills-description mt-4 text-lg text-muted-foreground">
            I've developed expertise in a wide range of technologies, allowing me to build complete, end-to-end
            solutions.
          </p>
        </div>

        <div className="skills-tabs mt-16">
          <Tabs defaultValue="languages" className="w-full">
            <div className="flex justify-center">
              <TabsList className="mb-8 bg-background/40 backdrop-blur-sm">
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                <TabsTrigger value="databases">Databases</TabsTrigger>
                <TabsTrigger value="specialties">Specialties</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="languages" className="mt-6">
              <Card className="premium-gradient-card border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    {skills.languages.map((skill) => (
                      <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} logo={skill.logo} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="frameworks" className="mt-6">
              <Card className="premium-gradient-card border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    {skills.frameworks.map((skill) => (
                      <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} logo={skill.logo} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="databases" className="mt-6">
              <Card className="premium-gradient-card border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    {skills.databases.map((skill) => (
                      <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} logo={skill.logo} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specialties" className="mt-6">
              <Card className="premium-gradient-card border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    {skills.specialties.map((skill) => (
                      <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} logo={skill.logo} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-2">
          {[...skills.languages, ...skills.frameworks, ...skills.databases, ...skills.specialties].map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: Math.random() * 0.5 }}
              whileHover={{
                scale: 1.1,
                rotate: Math.random() * 5 - 2.5,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm bg-background/40 backdrop-blur-sm border border-primary/20"
              >
                {skill.name}
              </Badge>
            </motion.div>
          ))}
        </div>
      
      </div>
    </section>
  )
}
