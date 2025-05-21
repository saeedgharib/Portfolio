"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 50

      // Color - using a gradient from primary color to a secondary color for dark theme
      const t = Math.random()
      colorArray[i * 3] = 0.3 + t * 0.3 // R: 0.3-0.6 (blue component)
      colorArray[i * 3 + 1] = 0.5 + t * 0.3 // G: 0.5-0.8 (blue component)
      colorArray[i * 3 + 2] = 0.9 // B: 0.9 (high blue component)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add floating 3D objects
    const addFloatingObjects = () => {
      // Create simple geometric shapes
      const geometries = [
        new THREE.IcosahedronGeometry(1, 0), // Low poly sphere
        new THREE.OctahedronGeometry(1, 0), // Octahedron
        new THREE.TetrahedronGeometry(1, 0), // Tetrahedron
        new THREE.TorusGeometry(0.7, 0.3, 16, 32), // Torus/donut
      ]

      const material = new THREE.MeshStandardMaterial({
        color: 0x4285f4, // Blue color
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x1a2b5e,
        emissiveIntensity: 0.5,
      })

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      // Create and position objects
      const objects: THREE.Mesh[] = []

      for (let i = 0; i < 5; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)]
        const mesh = new THREE.Mesh(geometry, material)

        // Random position far from center
        mesh.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30)

        // Random scale
        const scale = Math.random() * 0.5 + 0.5
        mesh.scale.set(scale, scale, scale)

        scene.add(mesh)
        objects.push(mesh)

        // Animate each object with GSAP
        gsap.to(mesh.rotation, {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
          duration: 20 + Math.random() * 10,
          repeat: -1,
          ease: "none",
        })

        // Floating animation
        gsap.to(mesh.position, {
          y: mesh.position.y + (Math.random() * 2 - 1),
          duration: 4 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      return objects
    }

    const floatingObjects = addFloatingObjects()

    // Animate on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY
      particlesMesh.rotation.y = scrollY * 0.0002 // Reduced from 0.0005
      particlesMesh.rotation.x = scrollY * 0.0001 // Reduced from 0.0002

      // Rotate floating objects on scroll
      floatingObjects.forEach((obj, i) => {
        obj.rotation.x += 0.001 * (i + 1)
        obj.rotation.y += 0.002 * (i + 1)
      })
    }

    window.addEventListener("scroll", handleScroll)

    // Animation
    gsap.to(particlesMesh.rotation, {
      y: Math.PI * 2,
      duration: 100,
      repeat: -1,
      ease: "none",
    })

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.y += 0.0005

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}
