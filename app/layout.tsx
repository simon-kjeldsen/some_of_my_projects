import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from './contexts/ThemeContext'

export const metadata: Metadata = {
    title: 'Neural Network Visualizer',
    description: 'Futuristic Neural Network Visualization Tool',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="transition-colors duration-300">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
} 