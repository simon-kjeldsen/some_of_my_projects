'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
    const [currentSection, setCurrentSection] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const [isClient, setIsClient] = useState(false)
    const { scrollYProgress } = useScroll()

    const backgrounds = [
        '/images/abstract-futuristic.jpg',
        '/images/abstract-futuristic.jpg',
        '/images/abstract-futuristic.jpg'
    ]

    const sections = [
        {
            title: "Welcome",
            subtitle: "On this page you can explore some of my digital projects",
            description: "Scroll down to see more",
            color: "neon-cyon"
        },
        {
            title: "PORTFOLIO",
            subtitle: "Games, websites, and more",
            description: "Click below",
            color: "neon-cyon"
        }
    ]

    useEffect(() => {
        // Set client flag and window height
        setIsClient(true)
        setWindowHeight(window.innerHeight)

        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const section = Math.floor(scrollPosition / windowHeight)
            setCurrentSection(Math.min(section, sections.length - 1))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sections.length])

    const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -100])
    const y2 = useTransform(scrollYProgress, [0.5, 1], [0, -200])
    const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const opacity2 = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])
    const opacity3 = useTransform(scrollYProgress, [0.7, 1], [0, 1])

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Background Images with Parallax */}
            <div className="fixed inset-0 z-0">
                <motion.div
                    className="absolute inset-0"
                    style={{ y: y1, opacity: opacity1 }}
                >
                    <Image
                        src={backgrounds[0]}
                        alt="Abstract Futuristic Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-overlay" />
                </motion.div>

                <motion.div
                    className="absolute inset-0"
                    style={{ y: y2, opacity: opacity2 }}
                >
                    <Image
                        src={backgrounds[1]}
                        alt="Robot Portrait Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-overlay" />
                </motion.div>

                <motion.div
                    className="absolute inset-0"
                    style={{ y: y2, opacity: opacity3 }}
                >
                    <Image
                        src={backgrounds[2]}
                        alt="Neon Dataflow Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-overlay" />
                </motion.div>
            </div>

            {/* Content Sections */}
            <div className="relative z-20">
                {sections.map((section, index) => (
                    <motion.section
                        key={index}
                        className="min-h-screen flex items-center justify-center relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                    >
                        <div className="text-center max-w-4xl mx-auto px-6" style={{ marginTop: index === sections.length - 1 ? '-20vh' : '0' }}>
                            {/* Section Indicator */}
                            <motion.div
                                className="flex justify-center mb-8 space-x-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {sections.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSection
                                            ? `bg-${section.color} scale-125`
                                            : 'bg-gray-500 dark:bg-gray-500 light:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                className={`text-6xl md:text-6xl font-bold neon-text text-${section.color} mb-6`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                {section.title}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                className="text-2xl md:text-2xl text-neon-green mb-8 neon-text"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                {section.subtitle}
                            </motion.p>

                            {/* Description */}
                            <motion.p
                                className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.7 }}
                            >
                                {section.description}
                            </motion.p>

                            {/* CTA Button - Only show on last section */}
                            {index === sections.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                >
                                    <Link href="/portfolio">
                                        <motion.button
                                            className={`px-8 py-4 bg-${section.color} text-black font-bold text-xl rounded-lg
                               hover:scale-105 transition-all duration-300 neon-border bg-white`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            EXPLORE PORTFOLIO
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Scroll Indicator */}
                            {index < sections.length - 1 && (
                                <motion.div
                                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1.5 }}
                                >
                                    <motion.div
                                        className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center"
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <motion.div
                                            className="w-1 h-3 bg-neon-cyan rounded-full mt-2"
                                            animate={{ y: [0, 12, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* Footer */}
            <div className="relative z-20 bg-darker-bg dark:bg-darker-bg light:bg-lighter-bg border-t border-gray-800 dark:border-gray-800 light:border-gray-200 py-8">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-neon-cyan font-bold mb-2">TECHNOLOGIES</h3>
                            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">React, TypeScript, Next.js, Tailwind CSS, Framer Motion</p>
                        </div>
                        <div>
                            <h3 className="text-neon-cyan font-bold mb-2">TOPICS</h3>
                            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Frontend Development, UI/UX Design, Interactive Animations</p>
                        </div>
                        <div>
                            <h3 className="text-neon-cyan font-bold mb-2">GITHUB ACCOUNT</h3>
                            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">simon-kjeldsen</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-800 dark:border-gray-800 light:border-gray-200">
                        <p className="text-gray-500 dark:text-gray-500 light:text-gray-400 text-xs">© 2025 Simon Keldsen. Built with modern web technologies.</p>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            {isClient && (
                <div className="fixed inset-0 z-10 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
} 