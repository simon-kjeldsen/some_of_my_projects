'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NeuralNetwork from '../components/NeuralNetwork'
import ControlPanel from '../components/ControlPanel'
import DataStream from '../components/DataStream'
import MatrixBackground from '../components/MatrixBackground'
import Link from 'next/link'

export default function NeuralNetworkPage() {
    const [isActive, setIsActive] = useState(false)
    const [networkConfig, setNetworkConfig] = useState({
        layers: [4, 6, 6, 3],
        learningRate: 0.01,
        epochs: 100,
        isTraining: false
    })

    useEffect(() => {
        const timer = setTimeout(() => setIsActive(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="min-h-screen bg-dark-bg relative overflow-hidden">
            {/* Matrix Background */}
            <MatrixBackground />

            {/* Scan Line Effect */}
            <div className="scan-line" />

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
                     hover:bg-neon-cyan hover:text-black transition-all duration-300 neon-border"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Tilbage
                    </motion.button>
                </Link>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header */}
                <motion.header
                    className="p-6 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -50 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold neon-text text-neon-cyan mb-4">
                        NEURAL NETWORK VISUALIZER
                    </h1>
                    <p className="text-neon-green text-lg md:text-xl">
                        Advanced AI System Interface v2.0
                    </p>
                </motion.header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
                    {/* Neural Network Visualization */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="bg-darker-bg border border-neon-cyan rounded-lg p-6 neon-border">
                            <h2 className="text-2xl font-bold text-neon-cyan mb-4 neon-text">
                                NETWORK ARCHITECTURE
                            </h2>
                            <NeuralNetwork
                                layers={networkConfig.layers}
                                isTraining={networkConfig.isTraining}
                            />
                        </div>
                    </motion.div>

                    {/* Control Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <ControlPanel
                            networkConfig={networkConfig}
                            setNetworkConfig={setNetworkConfig}
                        />
                    </motion.div>
                </div>

                {/* Data Stream */}
                <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 50 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <DataStream isActive={networkConfig.isTraining} />
                </motion.div>
            </div>
        </main>
    )
} 