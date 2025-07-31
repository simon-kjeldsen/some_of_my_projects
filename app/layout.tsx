import './globals.css'
import type { Metadata } from 'next'

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
            <body className="bg-dark-bg text-white">
                {children}
            </body>
        </html>
    )
} 