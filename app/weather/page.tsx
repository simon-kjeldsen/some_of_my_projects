'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { fetchCurrentWeather, fetchForecast, type WeatherData, type ForecastData } from '../services/weatherApi'

const weatherConditions = {
    'Sunny': { color: 'text-yellow-400', bg: 'bg-yellow-400/10', gradient: 'from-yellow-400 to-orange-500' },
    'Partly Cloudy': { color: 'text-blue-400', bg: 'bg-blue-400/10', gradient: 'from-blue-400 to-cyan-500' },
    'Cloudy': { color: 'text-gray-400', bg: 'bg-gray-400/10', gradient: 'from-gray-400 to-gray-600' },
    'Rain': { color: 'text-blue-600', bg: 'bg-blue-600/10', gradient: 'from-blue-600 to-indigo-700' },
    'Snow': { color: 'text-blue-200', bg: 'bg-blue-200/10', gradient: 'from-blue-200 to-white' },
    'Thunderstorm': { color: 'text-purple-600', bg: 'bg-purple-600/10', gradient: 'from-purple-600 to-indigo-800' }
}

export default function WeatherApp() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [forecast, setForecast] = useState<ForecastData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [city, setCity] = useState('Copenhagen')
    const [isLiveData, setIsLiveData] = useState(false)

    useEffect(() => {
        loadWeatherData()
    }, [city])

    const loadWeatherData = async () => {
        setIsLoading(true)
        setError(null)
        setIsLiveData(false)

        try {
            const [currentWeather, forecastData] = await Promise.all([
                fetchCurrentWeather(city),
                fetchForecast(city)
            ])

            // Check if we got live data (not fallback data)
            const isLive = currentWeather.location !== 'København, Danmark' ||
                currentWeather.temperature !== 18 ||
                currentWeather.condition !== 'Partly Cloudy'

            setIsLiveData(isLive)
            setWeather(currentWeather)
            setForecast(forecastData)

            if (isLive) {
                console.log('✅ Using LIVE weather data')
            } else {
                console.log('⚠️ Using MOCK weather data (API error or missing key)')
            }
        } catch (err) {
            setError('Kunne ikke indlæse vejrdata. Tjek din internetforbindelse.')
            console.error('Error loading weather data:', err)
            setIsLiveData(false)
        } finally {
            setIsLoading(false)
        }
    }

    const getWeatherStyle = (condition: string) => {
        return weatherConditions[condition as keyof typeof weatherConditions] || weatherConditions['Partly Cloudy']
    }

    const currentStyle = weather ? getWeatherStyle(weather.condition) : weatherConditions['Partly Cloudy']

    const handleCityChange = (newCity: string) => {
        setCity(newCity)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Floating Clouds */}
                <motion.div
                    className="absolute top-20 left-10 w-32 h-16 bg-white/20 rounded-full blur-xl"
                    animate={{
                        x: [0, 100, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-24 h-12 bg-white/15 rounded-full blur-lg"
                    animate={{
                        x: [0, -80, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 5
                    }}
                />

                {/* Rain Effect for Rain condition */}
                {weather?.condition === 'Rain' && (
                    <div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-0.5 h-8 bg-blue-400/60 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-2rem'
                                }}
                                animate={{
                                    y: ['0vh', '100vh'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 1 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Snow Effect for Snow condition */}
                {weather?.condition === 'Snow' && (
                    <div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/80 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-1rem'
                                }}
                                animate={{
                                    y: ['0vh', '100vh'],
                                    x: [0, Math.random() * 100 - 50],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 3
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Thunderstorm Effect */}
                {weather?.condition === 'Thunderstorm' && (
                    <div className="absolute inset-0">
                        <motion.div
                            className="absolute inset-0 bg-purple-600/20"
                            animate={{
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: Math.random() * 3
                            }}
                        />
                    </div>
                )}
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

            {/* City Selector and Globe Button */}
            <motion.div
                className="absolute top-6 right-6 z-20 flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <Link href="/weather/globe">
                    <motion.button
                        className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg
                         hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-lg">🌍</span>
                        <span className="hidden sm:inline">Globus</span>
                    </motion.button>
                </Link>

                <select
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg
                     hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="Copenhagen">København</option>
                    <option value="Aarhus">Aarhus</option>
                    <option value="Odense">Odense</option>
                    <option value="Aalborg">Aalborg</option>
                    <option value="Esbjerg">Esbjerg</option>
                    <option value="Randers">Randers</option>
                    <option value="Kolding">Kolding</option>
                    <option value="Horsens">Horsens</option>
                    <option value="Vejle">Vejle</option>
                    <option value="Roskilde">Roskilde</option>
                    <option value="Herning">Herning</option>
                    <option value="Silkeborg">Silkeborg</option>
                    <option value="Næstved">Næstved</option>
                    <option value="Fredericia">Fredericia</option>
                    <option value="Viborg">Viborg</option>
                    <option value="Køge">Køge</option>
                </select>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            className="flex-1 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="text-8xl mb-6"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    🌤️
                                </motion.div>
                                <motion.h2
                                    className="text-2xl font-bold text-white mb-2"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Indlæser vejrdata...
                                </motion.h2>
                                <p className="text-blue-200 text-sm">
                                    Henter live data for {city}
                                </p>
                            </div>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            className="flex-1 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-center">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Fejl ved indlæsning
                                </h2>
                                <p className="text-blue-200 mb-6 max-w-md">
                                    {error}
                                </p>
                                <motion.button
                                    onClick={loadWeatherData}
                                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg
                                     hover:bg-white/20 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Prøv igen
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : weather ? (
                        <motion.div
                            key="weather"
                            className="flex-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Current Weather */}
                            <section className="px-6 pt-20 pb-8">
                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {weather.location}
                                    </h1>
                                    <p className="text-blue-200 text-lg mb-2">
                                        {weather.description}
                                    </p>
                                    {/* Live Data Indicator */}
                                    <motion.div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isLiveData
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
                                </motion.div>

                                <motion.div
                                    className="mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <div className="flex flex-col md:flex-row items-center justify-between">
                                        {/* Temperature */}
                                        <div className="text-center md:text-left mb-6 md:mb-0">
                                            <motion.div
                                                className="text-8xl font-bold text-white mb-2"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.6 }}
                                            >
                                                {weather.temperature}°
                                            </motion.div>
                                            <p className="text-blue-200 text-lg">
                                                Føles som {weather.feelsLike}°
                                            </p>
                                        </div>

                                        {/* Weather Icon */}
                                        <motion.div
                                            className="text-8xl mb-4"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.8, delay: 0.8 }}
                                        >
                                            {weather.icon}
                                        </motion.div>

                                        {/* Weather Details */}
                                        <div className="text-center md:text-right">
                                            <h2 className={`text-2xl font-bold ${currentStyle.color} mb-2`}>
                                                {weather.condition}
                                            </h2>
                                            <div className="space-y-2 text-white/80 text-sm">
                                                <div>Luftfugtighed: {weather.humidity}%</div>
                                                <div>Vind: {weather.windSpeed} km/t</div>
                                                <div>Tryk: {weather.pressure} hPa</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </section>

                            {/* Forecast */}
                            {forecast.length > 0 && (
                                <section className="px-6 pb-8">
                                    <motion.h2
                                        className="text-2xl font-bold text-white mb-6 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 1 }}
                                    >
                                        5-dages prognose
                                    </motion.h2>

                                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                                        {forecast.map((day, index) => {
                                            const dayStyle = getWeatherStyle(day.condition)
                                            return (
                                                <motion.div
                                                    key={day.date}
                                                    className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer transition-all duration-300 ${selectedDay === index ? 'bg-white/20 border-white/40' : ''
                                                        }`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                    onClick={() => setSelectedDay(index)}
                                                >
                                                    <div className="text-center">
                                                        <div className="text-sm text-blue-200 mb-2">
                                                            {day.day}
                                                        </div>
                                                        <div className="text-3xl mb-2">
                                                            {day.icon}
                                                        </div>
                                                        <div className={`text-lg font-bold ${dayStyle.color}`}>
                                                            {day.temp}°
                                                        </div>
                                                        <div className="text-xs text-white/60 mt-1">
                                                            {day.condition}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Additional Weather Info */}
                            <section className="px-6 pb-20">
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.5 }}
                                >
                                    {/* UV Index */}
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-white font-semibold">UV Indeks</h3>
                                            <div className="text-2xl">☀️</div>
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-400">
                                            {weather.uvIndex}
                                        </div>
                                        <div className="text-sm text-blue-200 mt-2">
                                            {weather.uvIndex < 3 ? 'Lav' : weather.uvIndex < 6 ? 'Moderat' : 'Høj'}
                                        </div>
                                    </div>

                                    {/* Visibility */}
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-white font-semibold">Sigtbarhed</h3>
                                            <div className="text-2xl">👁️</div>
                                        </div>
                                        <div className="text-3xl font-bold text-blue-400">
                                            {weather.visibility} km
                                        </div>
                                        <div className="text-sm text-blue-200 mt-2">
                                            {weather.visibility > 8 ? 'God' : weather.visibility > 4 ? 'Moderat' : 'Dårlig'}
                                        </div>
                                    </div>

                                    {/* Wind */}
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-white font-semibold">Vind</h3>
                                            <motion.div
                                                className="text-2xl"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            >
                                                💨
                                            </motion.div>
                                        </div>
                                        <div className="text-3xl font-bold text-green-400">
                                            {weather.windSpeed} km/t
                                        </div>
                                        <div className="text-sm text-blue-200 mt-2">
                                            {weather.windSpeed < 10 ? 'Svag' : weather.windSpeed < 20 ? 'Moderat' : 'Stærk'}
                                        </div>
                                    </div>
                                </motion.div>
                            </section>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </main>
    )
} 