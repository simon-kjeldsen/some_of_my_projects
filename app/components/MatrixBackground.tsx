'use client'

import { useEffect, useState } from 'react'

const MatrixBackground = () => {
    const [columns, setColumns] = useState<Array<{ id: number; chars: string[]; speed: number }>>([])

    useEffect(() => {
        const createColumns = () => {
            const cols = []
            const numColumns = Math.floor(window.innerWidth / 20)

            for (let i = 0; i < numColumns; i++) {
                cols.push({
                    id: i,
                    chars: Array.from({ length: 20 }, () =>
                        String.fromCharCode(0x30A0 + Math.random() * 96)
                    ),
                    speed: 1000 + Math.random() * 2000
                })
            }
            setColumns(cols)
        }

        createColumns()

        const handleResize = () => createColumns()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="absolute top-0 text-neon-green opacity-20"
                    style={{
                        left: `${column.id * 20}px`,
                        animation: `matrix ${column.speed}ms linear infinite`
                    }}
                >
                    {column.chars.map((char, index) => (
                        <div
                            key={index}
                            className="matrix-rain"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                opacity: Math.random() * 0.5 + 0.5
                            }}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default MatrixBackground 