"use client"
import dynamic from "next/dynamic"

// Dynamically import Three.js components with no SSR
const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  ),
})

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <ThreeScene />
    </div>
  )
}
