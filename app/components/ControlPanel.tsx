'use client'

import { motion } from 'framer-motion'

interface NetworkConfig {
    layers: number[]
    learningRate: number
    epochs: number
    isTraining: boolean
}

interface ControlPanelProps {
    networkConfig: NetworkConfig
    setNetworkConfig: (config: NetworkConfig) => void
}

const ControlPanel = ({ networkConfig, setNetworkConfig }: ControlPanelProps) => {
    const handleLayerChange = (layerIndex: number, value: number) => {
        const newLayers = [...networkConfig.layers]
        newLayers[layerIndex] = Math.max(1, Math.min(10, value))
        setNetworkConfig({ ...networkConfig, layers: newLayers })
    }

    const handleLearningRateChange = (value: number) => {
        setNetworkConfig({ ...networkConfig, learningRate: value })
    }

    const handleEpochsChange = (value: number) => {
        setNetworkConfig({ ...networkConfig, epochs: value })
    }

    const toggleTraining = () => {
        setNetworkConfig({ ...networkConfig, isTraining: !networkConfig.isTraining })
    }

    return (
        <div className="bg-darker-bg border border-neon-pink rounded-lg p-6 neon-border">
            <h2 className="text-2xl font-bold text-neon-pink mb-6 neon-text">
                CONTROL PANEL
            </h2>

            {/* Layer Configuration */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-cyan mb-3 neon-text">
                    NETWORK LAYERS
                </h3>
                <div className="space-y-3">
                    {networkConfig.layers.map((layerSize, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <label className="text-sm text-neon-green w-16">
                                L{index + 1}:
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={layerSize}
                                onChange={(e) => handleLayerChange(index, parseInt(e.target.value))}
                                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <span className="text-neon-cyan w-8 text-right">
                                {layerSize}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Rate */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-cyan mb-3 neon-text">
                    LEARNING RATE
                </h3>
                <div className="flex items-center space-x-3">
                    <input
                        type="range"
                        min="0.001"
                        max="0.1"
                        step="0.001"
                        value={networkConfig.learningRate}
                        onChange={(e) => handleLearningRateChange(parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-neon-cyan w-16 text-right">
                        {networkConfig.learningRate.toFixed(3)}
                    </span>
                </div>
            </div>

            {/* Epochs */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-cyan mb-3 neon-text">
                    TRAINING EPOCHS
                </h3>
                <div className="flex items-center space-x-3">
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={networkConfig.epochs}
                        onChange={(e) => handleEpochsChange(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-neon-cyan w-16 text-right">
                        {networkConfig.epochs}
                    </span>
                </div>
            </div>

            {/* Training Controls */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-cyan mb-3 neon-text">
                    TRAINING STATUS
                </h3>
                <div className="flex items-center space-x-3">
                    <motion.button
                        onClick={toggleTraining}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${networkConfig.isTraining
                                ? 'bg-red-600 text-white border border-red-500'
                                : 'bg-green-600 text-white border border-green-500'
                            } hover:scale-105`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {networkConfig.isTraining ? 'STOP TRAINING' : 'START TRAINING'}
                    </motion.button>
                    <div className={`w-3 h-3 rounded-full ${networkConfig.isTraining ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
                        }`} />
                </div>
            </div>

            {/* Network Stats */}
            <div>
                <h3 className="text-lg font-semibold text-neon-cyan mb-3 neon-text">
                    NETWORK STATS
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-neon-green">Total Nodes:</span>
                        <span className="text-neon-cyan">{networkConfig.layers.reduce((a, b) => a + b, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neon-green">Total Connections:</span>
                        <span className="text-neon-cyan">
                            {networkConfig.layers.slice(0, -1).reduce((acc, layer, i) =>
                                acc + layer * networkConfig.layers[i + 1], 0
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neon-green">Layers:</span>
                        <span className="text-neon-cyan">{networkConfig.layers.length}</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          box-shadow: 0 0 10px #00ffff;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px #00ffff;
        }
      `}</style>
        </div>
    )
}

export default ControlPanel 