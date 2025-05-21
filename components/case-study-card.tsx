import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CaseStudyCardProps {
  title: string
  category: string
  description: string
  image: string
  link: string
}

export function CaseStudyCard({ title, category, description, image, link }: CaseStudyCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <Badge className="absolute left-4 top-4">{category}</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <Link href={link} className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
          View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
