'use client'

import { motion } from 'framer-motion'
import MatrixBackground from '../components/MatrixBackground'
import Link from 'next/link'

export default function ParticleSystemPage() {
    return (
        <main className="min-h-screen bg-dark-bg relative overflow-hidden">
            

            {/* Back Button */}
            <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/">
                    <motion.button
                        className="px-4 py-2 bg-darker-bg border border-neon-pink text-neon-pink rounded-lg
                     hover:bg-neon-pink hover:text-black transition-all duration-300 neon-border"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Tilbage
                    </motion.button>
                </Link>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="text-6xl font-bold neon-text text-neon-pink mb-8">
                        PARTICLE SYSTEM
                    </h1>
                    <p className="text-2xl text-neon-green mb-8">
                        Kommer snart...
                    </p>
                    <div className="text-6xl mb-8 animate-bounce">
                        ✨
                    </div>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Avanceret particle system med fysik simulation og interaktive effekter.
                        Dette projekt vil demonstrere WebGL, Three.js og avancerede animationer.
                    </p>
                </motion.div>
            </div>
        </main>
    )
} 