const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo_key'
const BASE_URL = 'https://newsapi.org/v2'

export interface NewsArticle {
    id: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    source: {
        name: string
    }
    category: string
    readTime?: number
}

export interface NewsCategory {
    id: string
    name: string
    icon: string
    color: string
    query: string
}

export const newsCategories: NewsCategory[] = [
    { id: 'general', name: 'Generelt', icon: '📰', color: 'text-blue-500', query: 'general' },
    { id: 'business', name: 'Erhverv', icon: '💼', color: 'text-green-500', query: 'business' },
    { id: 'technology', name: 'Teknologi', icon: '💻', color: 'text-purple-500', query: 'technology' },
    { id: 'sports', name: 'Sport', icon: '⚽', color: 'text-orange-500', query: 'sports' },
    { id: 'entertainment', name: 'Underholdning', icon: '🎬', color: 'text-pink-500', query: 'entertainment' },
    { id: 'health', name: 'Sundhed', icon: '🏥', color: 'text-red-500', query: 'health' },
    { id: 'science', name: 'Videnskab', icon: '🔬', color: 'text-indigo-500', query: 'science' }
]

export const fetchTopHeadlines = async (category: string = 'general', country: string = 'us'): Promise<NewsArticle[]> => {
    console.log('🔍 Fetching news for category:', category)
    console.log('🔑 API Key:', API_KEY ? 'Present' : 'Missing')

    try {
        const url = `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
        console.log('🌐 News API URL:', url.replace(API_KEY, '***'))

        const response = await fetch(url)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ News API Error:', response.status, errorText)
            throw new Error(`News API Error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('✅ Live news data received:', data)

        if (data.status === 'error') {
            throw new Error(data.message || 'News API error')
        }

        const articles = data.articles?.map((article: any, index: number) => ({
            id: `${category}-${index}`,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            source: {
                name: article.source?.name || 'Unknown'
            },
            category: category,
            readTime: Math.ceil((article.title?.length || 0) / 200) + 1 // Rough estimate
        })) || []

        console.log('📰 Processed news articles:', articles.length)
        return articles
    } catch (error) {
        console.error('❌ Error fetching news data:', error)
        console.log('🔄 Falling back to mock news data')
        // Return fallback data
        return [
            {
                id: 'mock-1',
                title: 'Breaking: Major Tech Breakthrough Announced',
                description: 'Scientists have announced a revolutionary breakthrough in quantum computing that could transform the industry.',
                url: 'https://example.com/news1',
                urlToImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
                publishedAt: new Date().toISOString(),
                source: { name: 'Tech News' },
                category: category,
                readTime: 3
            },
            {
                id: 'mock-2',
                title: 'Global Markets React to New Economic Policy',
                description: 'World markets are responding to the latest economic policy changes with significant movements across all sectors.',
                url: 'https://example.com/news2',
                urlToImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                publishedAt: new Date(Date.now() - 3600000).toISOString(),
                source: { name: 'Financial Times' },
                category: category,
                readTime: 4
            },
            {
                id: 'mock-3',
                title: 'Sports Championship Draws Record Viewership',
                description: 'The championship game has broken all previous records with millions of viewers tuning in worldwide.',
                url: 'https://example.com/news3',
                urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
                publishedAt: new Date(Date.now() - 7200000).toISOString(),
                source: { name: 'Sports Central' },
                category: category,
                readTime: 2
            },
            {
                id: 'mock-4',
                title: 'Entertainment Industry Announces Major Changes',
                description: 'The entertainment industry is undergoing significant changes with new streaming platforms and content strategies.',
                url: 'https://example.com/news4',
                urlToImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
                publishedAt: new Date(Date.now() - 10800000).toISOString(),
                source: { name: 'Entertainment Weekly' },
                category: category,
                readTime: 5
            },
            {
                id: 'mock-5',
                title: 'Healthcare Innovation Shows Promising Results',
                description: 'New healthcare technologies are showing promising results in clinical trials across multiple countries.',
                url: 'https://example.com/news5',
                urlToImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
                publishedAt: new Date(Date.now() - 14400000).toISOString(),
                source: { name: 'Health News' },
                category: category,
                readTime: 4
            }
        ]
    }
}

export const searchNews = async (query: string): Promise<NewsArticle[]> => {
    console.log('🔍 Searching news for query:', query)

    try {
        const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
        console.log('🌐 Search API URL:', url.replace(API_KEY, '***'))

        const response = await fetch(url)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ News Search API Error:', response.status, errorText)
            throw new Error(`News Search API Error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('✅ Live search results received:', data)

        if (data.status === 'error') {
            throw new Error(data.message || 'News API error')
        }

        const articles = data.articles?.map((article: any, index: number) => ({
            id: `search-${index}`,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            source: {
                name: article.source?.name || 'Unknown'
            },
            category: 'search',
            readTime: Math.ceil((article.title?.length || 0) / 200) + 1
        })) || []

        console.log('📰 Processed search results:', articles.length)
        return articles
    } catch (error) {
        console.error('❌ Error searching news:', error)
        console.log('🔄 Falling back to mock search results')
        return []
    }
} 