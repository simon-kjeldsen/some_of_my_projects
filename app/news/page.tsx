'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { fetchTopHeadlines, searchNews, newsCategories, type NewsArticle, type NewsCategory } from '../services/newsApi'

export default function NewsAggregator() {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('general')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isLiveData, setIsLiveData] = useState(false)

    useEffect(() => {
        loadNews()
    }, [selectedCategory])

    const loadNews = async () => {
        setIsLoading(true)
        setError(null)
        setIsLiveData(false)

        try {
            const newsData = await fetchTopHeadlines(selectedCategory)
            setArticles(newsData)

            // Check if we got live data (not fallback data)
            const isLive = newsData.length > 0 && newsData[0].title !== 'Breaking: Major Tech Breakthrough Announced'
            setIsLiveData(isLive)

            if (isLive) {
                console.log('✅ Using LIVE news data')
            } else {
                console.log('⚠️ Using MOCK news data (API error or missing key)')
            }
        } catch (err) {
            setError('Kunne ikke indlæse nyheder. Tjek din internetforbindelse.')
            console.error('Error loading news:', err)
            setIsLiveData(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            loadNews()
            return
        }

        setIsSearching(true)
        setError(null)

        try {
            const searchResults = await searchNews(query)
            setArticles(searchResults)
            setIsLiveData(searchResults.length > 0)
        } catch (err) {
            setError('Kunne ikke søge efter nyheder.')
            console.error('Error searching news:', err)
        } finally {
            setIsSearching(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return 'Lige nu'
        if (diffInHours < 24) return `${diffInHours} timer siden`
        if (diffInHours < 48) return 'I går'
        return date.toLocaleDateString('da-DK')
    }

    const getCategoryInfo = (categoryId: string): NewsCategory => {
        return newsCategories.find(cat => cat.id === categoryId) || newsCategories[0]
    }

    const currentCategory = getCategoryInfo(selectedCategory)

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Floating News Icons */}
                <motion.div
                    className="absolute top-20 left-10 text-4xl opacity-10"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    📰
                </motion.div>
                <motion.div
                    className="absolute top-40 right-20 text-3xl opacity-10"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    💻
                </motion.div>
                <motion.div
                    className="absolute bottom-40 left-20 text-2xl opacity-10"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 3, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    ⚽
                </motion.div>
            </div>

            {/* Back Button */}
            <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Link href="/portfolio">
                    <motion.button
                        className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg
                     hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Tilbage
                    </motion.button>
                </Link>
            </motion.div>

            {/* Header */}
            <motion.section
                className="text-center pt-20 pb-8 px-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    News Aggregator
                </h1>
                <p className="text-gray-300 text-lg mb-8">
                    Få de seneste nyheder fra hele verden
                </p>

                {/* Live Data Indicator */}
                <motion.div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6 ${isLiveData
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className={`w-2 h-2 rounded-full mr-2 ${isLiveData ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                        }`} />
                    {isLiveData ? 'Live Data' : 'Demo Data'}
                </motion.div>
            </motion.section>

            {/* Search Bar */}
            <motion.section
                className="px-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Søg efter nyheder..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                            className="w-full px-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl
                                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <motion.button
                            onClick={() => handleSearch(searchQuery)}
                            className="absolute right-2 top-2 px-4 py-2 bg-blue-500 text-white rounded-lg
                                     hover:bg-blue-600 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSearching ? '🔍' : 'Søg'}
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Categories */}
            <motion.section
                className="px-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {newsCategories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg backdrop-blur-md border transition-all duration-300 flex items-center gap-2 ${selectedCategory === category.id
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span className="hidden sm:inline">{category.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Content */}
            <div className="relative z-10">
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            className="flex-1 flex items-center justify-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="text-6xl mb-6"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    📰
                                </motion.div>
                                <motion.h2
                                    className="text-2xl font-bold text-white mb-2"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Indlæser nyheder...
                                </motion.h2>
                            </div>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            className="flex-1 flex items-center justify-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-center">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Fejl ved indlæsning
                                </h2>
                                <p className="text-gray-300 mb-6 max-w-md">
                                    {error}
                                </p>
                                <motion.button
                                    onClick={loadNews}
                                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg
                                     hover:bg-white/20 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Prøv igen
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="news"
                            className="px-6 pb-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Category Header */}
                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {currentCategory.name}
                                </h2>
                                <div className="text-4xl mb-4">{currentCategory.icon}</div>
                                <p className="text-gray-300">
                                    {articles.length} artikler fundet
                                </p>
                            </motion.div>

                            {/* Articles Grid */}
                            <div className="max-w-6xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articles.map((article, index) => (
                                        <motion.article
                                            key={article.id}
                                            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            transition={{ duration: 0.1 }}
                                        >
                                            {/* Article Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                                {/* Source Badge */}
                                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                                    {article.source.name}
                                                </div>

                                                {/* Read Time */}
                                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                                    {article.readTime} min
                                                </div>
                                            </div>

                                            {/* Article Content */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                                                    {article.title}
                                                </h3>

                                                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                                    {article.description}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400 text-xs">
                                                        {formatDate(article.publishedAt)}
                                                    </span>

                                                    <motion.a
                                                        href={article.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Læs mere →
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
} 