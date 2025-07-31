'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DataStreamProps {
    isActive: boolean
}

interface DataPoint {
    id: number
    timestamp: string
    value: number
    type: 'input' | 'output' | 'error' | 'weight'
}

const DataStream = ({ isActive }: DataStreamProps) => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
    const [currentEpoch, setCurrentEpoch] = useState(0)
    const [loss, setLoss] = useState(0.5)
    const [accuracy, setAccuracy] = useState(0.3)

    useEffect(() => {
        if (!isActive) return

        const interval = setInterval(() => {
            // Generer nye data points
            const newDataPoint: DataPoint = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                value: Math.random(),
                type: ['input', 'output', 'error', 'weight'][Math.floor(Math.random() * 4)] as any
            }

            setDataPoints(prev => {
                const newPoints = [...prev, newDataPoint]
                return newPoints.slice(-50) // Behold kun de sidste 50 punkter
            })

            // Opdater metrics
            setCurrentEpoch(prev => prev + 1)
            setLoss(prev => Math.max(0.01, prev - Math.random() * 0.01))
            setAccuracy(prev => Math.min(0.99, prev + Math.random() * 0.005))
        }, 100)

        return () => clearInterval(interval)
    }, [isActive])

    const getDataPointColor = (type: string) => {
        switch (type) {
            case 'input': return 'text-neon-cyan'
            case 'output': return 'text-neon-green'
            case 'error': return 'text-red-400'
            case 'weight': return 'text-neon-pink'
            default: return 'text-white'
        }
    }

    return (
        <div className="bg-darker-bg border border-neon-green rounded-lg p-6 neon-border">
            <h2 className="text-2xl font-bold text-neon-green mb-6 neon-text">
                DATA STREAM
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Real-time Metrics */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-neon-cyan neon-text">
                        TRAINING METRICS
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-neon-green">Epoch:</span>
                            <span className="text-neon-cyan font-mono">{currentEpoch}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-neon-green">Loss:</span>
                            <span className="text-red-400 font-mono">{loss.toFixed(4)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-neon-green">Accuracy:</span>
                            <span className="text-neon-green font-mono">{(accuracy * 100).toFixed(2)}%</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-neon-green">Training Progress</span>
                            <span className="text-neon-cyan">{Math.min(100, (currentEpoch / 100) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                                className="bg-gradient-to-r from-neon-cyan to-neon-green h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (currentEpoch / 100) * 100)}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Live Data Stream */}
                <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-neon-cyan mb-3 neon-text">
                        LIVE DATA FEED
                    </h3>

                    <div className="bg-black border border-neon-blue rounded-lg p-4 h-64 overflow-hidden relative">
                        {/* Scan line effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-20 animate-scan" />

                        <div className="h-full overflow-y-auto space-y-1 font-mono text-sm">
                            {dataPoints.map((point) => (
                                <motion.div
                                    key={point.id}
                                    className={`flex justify-between ${getDataPointColor(point.type)}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-xs text-gray-400">{point.timestamp}</span>
                                    <span className="uppercase">{point.type}:</span>
                                    <span className="font-bold">{point.value.toFixed(4)}</span>
                                </motion.div>
                            ))}

                            {isActive && (
                                <motion.div
                                    className="text-neon-green animate-pulse"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    &gt; Processing...
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-6 flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-neon-green animate-pulse' : 'bg-gray-500'
                    }`} />
                <span className={`text-sm ${isActive ? 'text-neon-green' : 'text-gray-400'}`}>
                    {isActive ? 'SYSTEM ACTIVE - TRAINING IN PROGRESS' : 'SYSTEM STANDBY'}
                </span>
            </div>
        </div>
    )
}

export default DataStream 