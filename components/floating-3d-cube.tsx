"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import gsap from "gsap"

export function Floating3DCubes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(300, 300)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create cubes
    const createCube = (position: [number, number, number], color: number, text: string) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.2,
      })

      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(position[0], position[1], position[2])

      scene.add(cube)

      // Animate rotation
      gsap.to(cube.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      })

      // Floating animation
      gsap.to(cube.position, {
        y: cube.position.y + 0.3,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      return cube
    }

    // Create cubes with different positions and colors
    const cube1 = createCube([-1.5, 0, 0], 0x4285f4, "JS")
    const cube2 = createCube([0, 0, 0], 0x0070f3, "React")
    const cube3 = createCube([1.5, 0, 0], 0x5e35b1, "Next")

    // Handle resize
    const handleResize = () => {
      renderer.setSize(300, 300)
      camera.aspect = 300 / 300
      camera.updateProjectionMatrix()
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      cube1.geometry.dispose()
      cube2.geometry.dispose()
      cube3.geometry.dispose()

      if (cube1.material instanceof THREE.Material) cube1.material.dispose()
      if (cube2.material instanceof THREE.Material) cube2.material.dispose()
      if (cube3.material instanceof THREE.Material) cube3.material.dispose()

      // Dispose of renderer
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="h-[300px] w-full" />
}
