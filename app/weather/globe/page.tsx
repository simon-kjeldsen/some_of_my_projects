'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as THREE from 'three'
import { AnimatePresence } from 'framer-motion'

interface CityData {
    name: string
    lat: number
    lng: number
    weather: {
        temp: number
        condition: string
        icon: string
    }
}

const cities: CityData[] = [
    { name: 'København', lat: 55.6761, lng: 12.5683, weather: { temp: 18, condition: 'Partly Cloudy', icon: '⛅' } },
    { name: 'Aarhus', lat: 56.1629, lng: 10.2039, weather: { temp: 17, condition: 'Sunny', icon: '☀️' } },
    { name: 'Odense', lat: 55.4038, lng: 10.4024, weather: { temp: 16, condition: 'Rain', icon: '🌧️' } },
    { name: 'Aalborg', lat: 57.0488, lng: 9.9217, weather: { temp: 15, condition: 'Cloudy', icon: '☁️' } },
    { name: 'Esbjerg', lat: 55.4668, lng: 8.4517, weather: { temp: 14, condition: 'Windy', icon: '💨' } },
    { name: 'Randers', lat: 56.4607, lng: 10.0369, weather: { temp: 16, condition: 'Partly Cloudy', icon: '⛅' } },
    { name: 'Kolding', lat: 55.4904, lng: 9.4721, weather: { temp: 17, condition: 'Sunny', icon: '☀️' } },
    { name: 'Horsens', lat: 55.8607, lng: 9.8501, weather: { temp: 16, condition: 'Cloudy', icon: '☁️' } },
    { name: 'Vejle', lat: 55.7094, lng: 9.5345, weather: { temp: 15, condition: 'Rain', icon: '🌧️' } },
    { name: 'Roskilde', lat: 55.6415, lng: 12.0803, weather: { temp: 18, condition: 'Partly Cloudy', icon: '⛅' } },
    { name: 'Herning', lat: 56.1362, lng: 8.9766, weather: { temp: 16, condition: 'Sunny', icon: '☀️' } },
    { name: 'Silkeborg', lat: 56.1699, lng: 9.5451, weather: { temp: 15, condition: 'Cloudy', icon: '☁️' } },
    { name: 'Næstved', lat: 55.2244, lng: 11.7606, weather: { temp: 17, condition: 'Partly Cloudy', icon: '⛅' } },
    { name: 'Fredericia', lat: 55.5658, lng: 9.7526, weather: { temp: 16, condition: 'Windy', icon: '💨' } },
    { name: 'Viborg', lat: 56.4539, lng: 9.4020, weather: { temp: 15, condition: 'Rain', icon: '🌧️' } },
    { name: 'Køge', lat: 55.4584, lng: 12.1821, weather: { temp: 18, condition: 'Sunny', icon: '☀️' } }
]

export default function WeatherGlobe() {
    const mountRef = useRef<HTMLDivElement>(null)
    const [selectedCity, setSelectedCity] = useState<CityData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        if (!mountRef.current) return

        // Three.js setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x000000, 0)
        mountRef.current.appendChild(renderer.domElement)

        // Create Earth
        const earthGeometry = new THREE.SphereGeometry(5, 64, 64)
        const earthTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg', () => {
            setIsLoading(false)
        })
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthTexture,
            transparent: true,
            opacity: 0.9
        })
        const earth = new THREE.Mesh(earthGeometry, earthMaterial)
        scene.add(earth)

        // Add atmosphere
        const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64)
        const atmosphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x87CEEB,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        })
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
        scene.add(atmosphere)

        // Add city markers
        const cityMarkers: THREE.Mesh[] = []
        cities.forEach((city, index) => {
            const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16)
            const markerMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.8
            })
            const marker = new THREE.Mesh(markerGeometry, markerMaterial)

            // Convert lat/lng to 3D position
            const phi = (90 - city.lat) * (Math.PI / 180)
            const theta = (city.lng + 180) * (Math.PI / 180)
            const x = -(5.1 * Math.sin(phi) * Math.cos(theta))
            const z = (5.1 * Math.sin(phi) * Math.sin(theta))
            const y = (5.1 * Math.cos(phi))

            marker.position.set(x, y, z)
            scene.add(marker)
            cityMarkers.push(marker)

            // Add pulsing animation
            const pulse = () => {
                marker.scale.setScalar(1 + Math.sin(Date.now() * 0.003 + index) * 0.3)
                requestAnimationFrame(pulse)
            }
            pulse()
        })

        // Add stars
        const starsGeometry = new THREE.BufferGeometry()
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })
        const starsVertices = []
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 2000
            const y = (Math.random() - 0.5) * 2000
            const z = (Math.random() - 0.5) * 2000
            starsVertices.push(x, y, z)
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
        const stars = new THREE.Points(starsGeometry, starsMaterial)
        scene.add(stars)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(10, 10, 5)
        scene.add(directionalLight)

        // Camera position
        camera.position.z = 15

        // Mouse controls
        let mouseX = 0
        let mouseY = 0
        let isMouseDown = false

        const onMouseDown = (event: MouseEvent) => {
            isMouseDown = true
            setIsDragging(true)
        }

        const onMouseUp = () => {
            isMouseDown = false
            setIsDragging(false)
        }

        const onMouseMove = (event: MouseEvent) => {
            if (isMouseDown) {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1
            }
        }

        const onWheel = (event: WheelEvent) => {
            camera.position.z = Math.max(8, Math.min(20, camera.position.z + event.deltaY * 0.01))
        }

        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('wheel', onWheel)

        // Raycaster for city selection
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        const onClick = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(cityMarkers)

            if (intersects.length > 0) {
                const index = cityMarkers.indexOf(intersects[0].object as THREE.Mesh)
                setSelectedCity(cities[index])
            }
        }

        document.addEventListener('click', onClick)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            // Rotate Earth
            if (!isMouseDown) {
                earth.rotation.y += 0.002
            } else {
                earth.rotation.y += mouseX * 0.01
                earth.rotation.x += mouseY * 0.01
            }

            // Rotate stars
            stars.rotation.y += 0.0005

            // Rotate atmosphere
            atmosphere.rotation.y += 0.001

            renderer.render(scene, camera)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('wheel', onWheel)
            document.removeEventListener('click', onClick)
            window.removeEventListener('resize', handleResize)
            mountRef.current?.removeChild(renderer.domElement)
            renderer.dispose()
        }
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
            {/* Back Button */}
            <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Link href="/weather">
                    <motion.button
                        className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg
                     hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Tilbage
                    </motion.button>
                </Link>
            </motion.div>

            {/* Instructions */}
            <motion.div
                className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg px-4 py-2 text-center">
                    <p className="text-sm">
                        {isDragging ? 'Træk for at rotere' : 'Klik på byer for vejr-info'}
                    </p>
                </div>
            </motion.div>

            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="text-center">
                            <motion.div
                                className="text-8xl mb-6"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                🌍
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Indlæser globus...
                            </h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Globe Container */}
            <div ref={mountRef} className="w-full h-screen" />

            {/* City Info Panel */}
            <AnimatePresence>
                {selectedCity && (
                    <motion.div
                        className="absolute bottom-6 left-6 z-20"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">{selectedCity.name}</h3>
                                <div className="text-3xl">{selectedCity.weather.icon}</div>
                            </div>
                            <div className="space-y-2 text-white/80">
                                <div className="flex justify-between">
                                    <span>Temperatur:</span>
                                    <span className="font-bold">{selectedCity.weather.temp}°C</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Vejr:</span>
                                    <span>{selectedCity.weather.condition}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Koordinater:</span>
                                    <span className="text-xs">
                                        {selectedCity.lat.toFixed(2)}, {selectedCity.lng.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
} 