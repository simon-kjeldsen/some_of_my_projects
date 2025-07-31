'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)

        // Track mouse movement
        document.addEventListener('mousemove', updateCursorPosition)

        // Track hover states for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [])

    return (
        <div
            className={`custom-cursor ${isHovering ? 'hover' : ''}`}
            style={{
                left: `${position.x - 10}px`,
                top: `${position.y - 10}px`,
            }}
        />
    )
} 