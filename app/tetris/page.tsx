'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Tetris piece shapes
const TETROMINOS = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: 'neon-cyan'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: 'neon-blue'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: 'neon-orange'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: 'neon-yellow'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: 'neon-green'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: 'neon-purple'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: 'neon-pink'
    }
}

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20

export default function Tetris() {
    const [board, setBoard] = useState(createBoard())
    const [currentPiece, setCurrentPiece] = useState(null)
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(1)
    const [lines, setLines] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [dropTime, setDropTime] = useState(null)

    function createBoard() {
        return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))
    }

    function getRandomPiece() {
        const pieces = Object.keys(TETROMINOS)
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
        return {
            ...TETROMINOS[randomPiece],
            type: randomPiece
        }
    }

    function isValidMove(piece, position, board) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = position.x + x
                    const newY = position.y + y

                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                        return false
                    }

                    if (newY >= 0 && board[newY][newX]) {
                        return false
                    }
                }
            }
        }
        return true
    }

    function placePiece() {
        if (!currentPiece) return

        const newBoard = board.map(row => [...row])

        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    const boardX = currentPosition.x + x
                    const boardY = currentPosition.y + y

                    if (boardY >= 0) {
                        newBoard[boardY][boardX] = currentPiece.type
                    }
                }
            }
        }

        setBoard(newBoard)
        checkLines(newBoard)
        spawnNewPiece()
    }

    function checkLines(board) {
        let linesCleared = 0

        for (let y = board.length - 1; y >= 0; y--) {
            if (board[y].every(cell => cell !== 0)) {
                board.splice(y, 1)
                board.unshift(Array(BOARD_WIDTH).fill(0))
                linesCleared++
                y++ // Check the same line again
            }
        }

        if (linesCleared > 0) {
            setLines(prev => prev + linesCleared)
            setScore(prev => prev + linesCleared * 100 * level)

            if (lines + linesCleared >= level * 10) {
                setLevel(prev => prev + 1)
            }
        }
    }

    function spawnNewPiece() {
        const newPiece = getRandomPiece()
        const newPosition = { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2), y: 0 }

        if (!isValidMove(newPiece, newPosition, board)) {
            setGameOver(true)
            return
        }

        setCurrentPiece(newPiece)
        setCurrentPosition(newPosition)
    }

    function movePiece(direction) {
        if (!currentPiece || gameOver || isPaused) return

        const newPosition = {
            x: currentPosition.x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
            y: currentPosition.y + (direction === 'down' ? 1 : 0)
        }

        if (isValidMove(currentPiece, newPosition, board)) {
            setCurrentPosition(newPosition)
        } else if (direction === 'down') {
            placePiece()
        }
    }

    function rotatePiece() {
        if (!currentPiece || gameOver || isPaused) return

        const rotated = currentPiece.shape[0].map((_, i) =>
            currentPiece.shape.map(row => row[row.length - 1 - i])
        )

        const rotatedPiece = { ...currentPiece, shape: rotated }

        if (isValidMove(rotatedPiece, currentPosition, board)) {
            setCurrentPiece(rotatedPiece)
        }
    }

    function handleKeyPress(e) {
        if (gameOver) return

        switch (e.key) {
            case 'ArrowLeft':
                movePiece('left')
                break
            case 'ArrowRight':
                movePiece('right')
                break
            case 'ArrowDown':
                movePiece('down')
                break
            case 'ArrowUp':
            case ' ':
                rotatePiece()
                break
            case 'p':
                setIsPaused(prev => !prev)
                break
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [currentPiece, currentPosition, board, gameOver, isPaused])

    useEffect(() => {
        if (!gameOver && !isPaused) {
            const interval = setInterval(() => {
                movePiece('down')
            }, 1000 - (level - 1) * 50)

            return () => clearInterval(interval)
        }
    }, [currentPiece, currentPosition, board, gameOver, isPaused, level])

    useEffect(() => {
        if (!currentPiece && !gameOver) {
            spawnNewPiece()
        }
    }, [currentPiece, gameOver])

    function resetGame() {
        setBoard(createBoard())
        setCurrentPiece(null)
        setCurrentPosition({ x: 0, y: 0 })
        setScore(0)
        setLevel(1)
        setLines(0)
        setGameOver(false)
        setIsPaused(false)
    }

    function renderCell(cell, x, y) {
        if (cell === 0) return null

        const piece = TETROMINOS[cell]
        return (
            <motion.div
                key={`${x}-${y}`}
                className={`w-6 h-6 border border-${piece.color} bg-${piece.color} opacity-80`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
            />
        )
    }

    function renderCurrentPiece() {
        if (!currentPiece) return null

        return currentPiece.shape.map((row, y) =>
            row.map((cell, x) => {
                if (!cell) return null

                const boardX = currentPosition.x + x
                const boardY = currentPosition.y + y

                if (boardY < 0) return null

                return (
                    <motion.div
                        key={`current-${x}-${y}`}
                        className={`absolute w-6 h-6 border border-${currentPiece.color} bg-${currentPiece.color} opacity-90`}
                        style={{
                            left: `${boardX * 24}px`,
                            top: `${boardY * 24}px`
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.1 }}
                    />
                )
            })
        )
    }

    return (
        <main className="min-h-screen bg-dark-bg relative overflow-hidden">
            {/* Back Button */}
            <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/portfolio">
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
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    {/* Title */}
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold neon-text text-neon-purple mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        TETRIS
                    </motion.h1>

                    {/* Game Container */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        {/* Game Board */}
                        <motion.div
                            className="relative bg-darker-bg border-2 border-neon-purple p-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {/* Board Grid */}
                            <div className="relative" style={{ width: BOARD_WIDTH * 24, height: BOARD_HEIGHT * 24 }}>
                                {board.map((row, y) =>
                                    row.map((cell, x) => (
                                        <div
                                            key={`${x}-${y}`}
                                            className="absolute w-6 h-6 border border-gray-700"
                                            style={{ left: x * 24, top: y * 24 }}
                                        >
                                            {renderCell(cell, x, y)}
                                        </div>
                                    ))
                                )}
                                {renderCurrentPiece()}
                            </div>

                            {/* Game Over Overlay */}
                            {gameOver && (
                                <motion.div
                                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-neon-pink mb-4">GAME OVER</h2>
                                        <button
                                            onClick={resetGame}
                                            className="px-6 py-3 bg-neon-purple text-black font-bold rounded-lg hover:bg-neon-pink transition-all duration-300"
                                        >
                                            Play Again
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Pause Overlay */}
                            {isPaused && !gameOver && (
                                <motion.div
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <h2 className="text-2xl font-bold text-neon-cyan">PAUSED</h2>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Game Info */}
                        <motion.div
                            className="text-left space-y-6"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {/* Score */}
                            <div>
                                <h3 className="text-neon-cyan font-bold text-lg mb-2">SCORE</h3>
                                <p className="text-3xl font-bold text-neon-green">{score}</p>
                            </div>

                            {/* Level */}
                            <div>
                                <h3 className="text-neon-pink font-bold text-lg mb-2">LEVEL</h3>
                                <p className="text-2xl font-bold text-neon-purple">{level}</p>
                            </div>

                            {/* Lines */}
                            <div>
                                <h3 className="text-neon-yellow font-bold text-lg mb-2">LINES</h3>
                                <p className="text-2xl font-bold text-neon-orange">{lines}</p>
                            </div>

                            {/* Controls */}
                            <div>
                                <h3 className="text-neon-green font-bold text-lg mb-2">CONTROLS</h3>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <p>← → Move</p>
                                    <p>↓ Drop</p>
                                    <p>↑ Rotate</p>
                                    <p>P Pause</p>
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={resetGame}
                                className="px-4 py-2 bg-neon-purple text-black font-bold rounded-lg hover:bg-neon-pink transition-all duration-300"
                            >
                                Reset Game
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
} 