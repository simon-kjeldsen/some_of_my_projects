'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MatrixBackground from '../components/MatrixBackground'
import Link from 'next/link'

interface ProjectCard {
    id: string
    title: string
    description: string
    category: string
    icon: string
    color: string
    gradient: string
    href: string
    isNew?: boolean
}

const projects: ProjectCard[] = [
    {
        id: 'neural-network',
        title: 'Neural Network Visualizer',
        description: 'Interaktiv 3D neural network visualisering med real-time training animationer',
        category: 'AI/ML',
        icon: '⚡',
        color: 'neon-cyan',
        gradient: 'from-neon-cyan to-blue-500',
        href: '/neural-network'
    },
    {
        id: 'juridisk-assistent',
        title: 'Juridisk Assistent',
        description: 'AI-drevet juridisk assistent via Google Gemini API med login funktionalitet samt gemte chats',
        category: 'AI/ML',
        icon: '⚖️',
        color: 'neon-blue',
        gradient: 'from-neon-blue to-purple-500',
        href: 'https://jura-assistent.vercel.app/auth/signin'
    },
    {
        id: 'news-aggregator',
        title: 'News Aggregator',
        description: 'Moderne nyheds-aggregator med live feeds fra forskellige kilder og kategorier via NewsAPI',
        category: 'News',
        icon: '📰',
        color: 'neon-green',
        gradient: 'from-neon-green to-emerald-500',
        href: '/news',
        isNew: true
    },
    {
        id: 'tetris',
        title: 'Tetris',
        description: 'Klassisk Tetris spil med moderne neon design og smooth animations',
        category: 'Gaming',
        icon: '🎮',
        color: 'neon-purple',
        gradient: 'from-neon-purple to-indigo-500',
        href: '/tetris'
    },
    {
        id: 'weather-app',
        title: 'Weather App',
        description: 'Moderne vejr-app med live data og præcise prognoser via OpenWeatherMap-API',
        category: 'Weather',
        icon: '🌤️',
        color: 'neon-blue',
        gradient: 'from-blue-400 to-cyan-500',
        href: '/weather',
        isNew: true
    },
    {
        id: 'ecommerce-app',
        title: 'E-Commerce App',
        description: 'Fuldt funktionel og moderne webshop med login-system (inkl. Google Auth), Stripe-betaling, database og admin-panel.',
        category: 'E-Commerce',
        icon: '🛒',
        color: 'neon-yellow',
        gradient: 'from-yellow-400 to-orange-500',
        href: 'https://sportio-website.vercel.app/',
        isNew: true
    }
]

export default function Portfolio() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsActive(true), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Floating Project Icons */}
                <motion.div
                    className="absolute top-20 left-10 text-4xl opacity-10"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    ⚡
                </motion.div>
                <motion.div
                    className="absolute top-40 right-20 text-3xl opacity-10"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    🎮
                </motion.div>
                <motion.div
                    className="absolute bottom-40 left-20 text-2xl opacity-10"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 3, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    📰
                </motion.div>
                <motion.div
                    className="absolute bottom-20 right-10 text-3xl opacity-10"
                    animate={{
                        y: [0, 10, 0],
                        rotate: [0, -3, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3
                    }}
                >
                    🌤️
                </motion.div>
            </div>

            {/* Back Button */}
            <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Link href="/">
                    <motion.button
                        className="px-4 py-2 bg-darker-bg border border-neon-cyan text-neon-cyan rounded-lg
                     hover:bg-neon-green hover:text-black transition-all duration-300 neon-border"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Tilbage
                    </motion.button>
                </Link>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <motion.section
                    className="text-center py-20 px-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -50 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold neon-text text-neon-cyan mb-4">
                        PROJECTS
                    </h1>
                    <p className="text-neon-green text-lg md:text-xl">
                        Games, websites, and more
                    </p>
                </motion.section>

                {/* Projects Grid */}
                <motion.section
                    className="max-w-7xl mx-auto px-6 pb-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial="hidden"
                                animate={isActive ? "visible" : "hidden"}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    y: -5,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                transition={{
                                    hidden: { duration: 0.4, delay: 1.5 + index * 0.05 },
                                    visible: { duration: 0.4, delay: 1.5 + index * 0.05 }
                                }}
                            >
                                <Link href={project.href}>
                                    <div className={`
                    relative h-80 bg-darker-bg border border-${project.color} rounded-xl p-6
                    neon-border cursor-pointer overflow-hidden group
                    transition-transform duration-200 ease-out
                  `}>
                                        {/* Background Gradient */}
                                        <div className={`
                      absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 
                      group-hover:opacity-10 transition-opacity duration-300
                    `} />

                                        {/* New Badge */}
                                        {project.isNew && (
                                            <motion.div
                                                className="absolute top-4 right-4 bg-neon-pink text-black px-3 py-1 rounded-full text-xs font-bold"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 2.5 + index * 0.1 }}
                                            >
                                                NEW
                                            </motion.div>
                                        )}

                                        {/* Icon */}
                                        <div className="text-6xl mb-4 text-center group-hover:scale-105 transition-transform duration-300">
                                            {project.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <h3 className={`text-xl font-bold text-${project.color} mb-3 neon-text`}>
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                                                    {project.category}
                                                </span>

                                                <div className={`text-${project.color} text-2xl group-hover:translate-x-1 transition-transform duration-200`}>
                                                    →
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Effect */}
                                        <div className={`
                      absolute inset-0 border-2 border-${project.color} rounded-xl
                      opacity-0 group-hover:opacity-100 transition-opacity duration-150
                    `} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Footer */}
                <motion.footer
                    className="text-center py-12 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <p className="text-gray-400 mb-4">
                        Bygget med Next.js, TypeScript, Tailwind CSS & Framer Motion
                    </p>
                    <div className="flex justify-center space-x-6 text-sm text-gray-500">
                        <span>React</span>
                        <span>•</span>
                        <span>TypeScript</span>
                        <span>•</span>
                        <span>Three.js</span>
                        <span>•</span>
                        <span>WebGL</span>
                    </div>
                </motion.footer>
            </div>
        </main>
    )
} 