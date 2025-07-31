'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NeuralNetworkProps {
    layers: number[]
    isTraining: boolean
}

interface Node {
    id: string
    layer: number
    index: number
    activation: number
    isActive: boolean
}

interface Connection {
    from: string
    to: string
    weight: number
    isActive: boolean
}

const NeuralNetwork = ({ layers, isTraining }: NeuralNetworkProps) => {
    const [nodes, setNodes] = useState<Node[]>([])
    const [connections, setConnections] = useState<Connection[]>([])
    const [selectedNode, setSelectedNode] = useState<string | null>(null)

    // Generer nodes og connections
    useEffect(() => {
        const newNodes: Node[] = []
        const newConnections: Connection[] = []

        // Opret nodes for hver layer
        layers.forEach((layerSize, layerIndex) => {
            for (let i = 0; i < layerSize; i++) {
                const nodeId = `layer-${layerIndex}-node-${i}`
                newNodes.push({
                    id: nodeId,
                    layer: layerIndex,
                    index: i,
                    activation: Math.random(),
                    isActive: false
                })
            }
        })

        // Opret connections mellem layers
        for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
            const currentLayerSize = layers[layerIndex]
            const nextLayerSize = layers[layerIndex + 1]

            for (let fromIndex = 0; fromIndex < currentLayerSize; fromIndex++) {
                for (let toIndex = 0; toIndex < nextLayerSize; toIndex++) {
                    const fromId = `layer-${layerIndex}-node-${fromIndex}`
                    const toId = `layer-${layerIndex + 1}-node-${toIndex}`

                    newConnections.push({
                        from: fromId,
                        to: toId,
                        weight: Math.random() * 2 - 1,
                        isActive: false
                    })
                }
            }
        }

        setNodes(newNodes)
        setConnections(newConnections)
    }, [layers])

    // Simuler training animation
    useEffect(() => {
        if (!isTraining) return

        const interval = setInterval(() => {
            setNodes(prevNodes =>
                prevNodes.map(node => ({
                    ...node,
                    activation: Math.random(),
                    isActive: Math.random() > 0.7
                }))
            )

            setConnections(prevConnections =>
                prevConnections.map(conn => ({
                    ...conn,
                    weight: conn.weight + (Math.random() - 0.5) * 0.1,
                    isActive: Math.random() > 0.8
                }))
            )
        }, 200)

        return () => clearInterval(interval)
    }, [isTraining])

    const getNodeColor = (node: Node) => {
        if (selectedNode === node.id) return 'text-neon-pink'
        if (node.isActive) return 'text-neon-green'
        return 'text-neon-cyan'
    }

    const getConnectionColor = (connection: Connection) => {
        if (connection.isActive) return 'stroke-neon-green'
        return 'stroke-neon-blue'
    }

    return (
        <div className="relative w-full h-96">
            <svg className="w-full h-full absolute inset-0">
                {/* Connections */}
                {connections.map((connection, index) => {
                    const fromNode = nodes.find(n => n.id === connection.from)
                    const toNode = nodes.find(n => n.id === connection.to)

                    if (!fromNode || !toNode) return null

                    const fromX = (fromNode.layer / (layers.length - 1)) * 80 + 10
                    const fromY = (fromNode.index / (layers[fromNode.layer] - 1)) * 80 + 10
                    const toX = (toNode.layer / (layers.length - 1)) * 80 + 10
                    const toY = (toNode.index / (layers[toNode.layer] - 1)) * 80 + 10

                    return (
                        <motion.line
                            key={index}
                            x1={`${fromX}%`}
                            y1={`${fromY}%`}
                            x2={`${toX}%`}
                            y2={`${toY}%`}
                            strokeWidth={Math.abs(connection.weight) * 3 + 0.5}
                            className={`${getConnectionColor(connection)} transition-all duration-300`}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: index * 0.01 }}
                        />
                    )
                })}
            </svg>

            {/* Nodes */}
            <div className="relative w-full h-full">
                {nodes.map((node) => {
                    const x = (node.layer / (layers.length - 1)) * 80 + 10
                    const y = (node.index / (layers[node.layer] - 1)) * 80 + 10

                    return (
                        <motion.div
                            key={node.id}
                            className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${getNodeColor(node)
                                } ${node.isActive ? 'animate-glow' : ''}`}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: node.layer * 0.1 + node.index * 0.05 }}
                            whileHover={{ scale: 1.5 }}
                            onClick={() => setSelectedNode(node.id)}
                        >
                            <div className={`w-full h-full rounded-full bg-current opacity-20 ${node.isActive ? 'animate-pulse' : ''
                                }`} />
                            <div className="absolute inset-0 rounded-full border-2 border-current" />
                        </motion.div>
                    )
                })}
            </div>

            {/* Layer Labels */}
            {layers.map((layerSize, layerIndex) => (
                <div
                    key={layerIndex}
                    className="absolute top-0 text-xs text-neon-purple neon-text"
                    style={{ left: `${(layerIndex / (layers.length - 1)) * 80 + 10}%` }}
                >
                    L{layerIndex + 1}
                </div>
            ))}
        </div>
    )
}

export default NeuralNetwork 