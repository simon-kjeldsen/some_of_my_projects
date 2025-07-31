const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || 'demo_key'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export interface WeatherData {
    location: string
    temperature: number
    feelsLike: number
    condition: string
    humidity: number
    windSpeed: number
    pressure: number
    visibility: number
    uvIndex: number
    icon: string
    description: string
    weatherCode: number
}

export interface ForecastData {
    date: string
    day: string
    temp: number
    condition: string
    icon: string
    weatherCode: number
}

// Map OpenWeatherMap weather codes to our conditions
const weatherCodeMap: { [key: number]: { condition: string; icon: string; color: string } } = {
    200: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    201: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    202: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    210: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    211: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    212: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    221: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    230: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    231: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    232: { condition: 'Thunderstorm', icon: '⛈️', color: 'text-purple-600' },
    300: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    301: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    302: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    310: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    311: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    312: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    313: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    314: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    321: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    500: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    501: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    502: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    503: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    504: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    511: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    520: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    521: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    522: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    531: { condition: 'Rain', icon: '🌧️', color: 'text-blue-600' },
    600: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    601: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    602: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    611: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    612: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    613: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    615: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    616: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    620: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    621: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    622: { condition: 'Snow', icon: '❄️', color: 'text-blue-200' },
    701: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    711: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    721: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    731: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    741: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    751: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    761: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    762: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    771: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    781: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    800: { condition: 'Sunny', icon: '☀️', color: 'text-yellow-400' },
    801: { condition: 'Partly Cloudy', icon: '⛅', color: 'text-blue-400' },
    802: { condition: 'Partly Cloudy', icon: '⛅', color: 'text-blue-400' },
    803: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' },
    804: { condition: 'Cloudy', icon: '☁️', color: 'text-gray-400' }
}

export const getWeatherCondition = (code: number) => {
    return weatherCodeMap[code] || { condition: 'Partly Cloudy', icon: '⛅', color: 'text-blue-400' }
}

export const fetchCurrentWeather = async (city: string = 'Copenhagen'): Promise<WeatherData> => {
    console.log('🔍 Fetching weather data for:', city)
    console.log('🔑 API Key:', API_KEY ? 'Present' : 'Missing')

    try {
        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=da`
        console.log('🌐 API URL:', url.replace(API_KEY, '***'))

        const response = await fetch(url)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ API Error:', response.status, errorText)
            throw new Error(`API Error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('✅ Live weather data received:', data)

        const weatherCode = data.weather[0].id
        const weatherInfo = getWeatherCondition(weatherCode)

        const weatherData = {
            location: `${data.name}, ${data.sys.country}`,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition: weatherInfo.condition,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            pressure: data.main.pressure,
            visibility: Math.round(data.visibility / 1000), // Convert m to km
            uvIndex: 4, // OpenWeatherMap doesn't provide UV in free tier
            icon: weatherInfo.icon,
            description: data.weather[0].description,
            weatherCode: weatherCode
        }

        console.log('🌤️ Processed weather data:', weatherData)
        return weatherData
    } catch (error) {
        console.error('❌ Error fetching weather data:', error)
        console.log('🔄 Falling back to mock data')
        // Return fallback data
        return {
            location: 'København, Danmark',
            temperature: 18,
            feelsLike: 20,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            pressure: 1013,
            visibility: 10,
            uvIndex: 4,
            icon: '⛅',
            description: 'Let skyet med perioder med sol',
            weatherCode: 801
        }
    }
}

export const fetchForecast = async (city: string = 'Copenhagen'): Promise<ForecastData[]> => {
    console.log('🔍 Fetching forecast data for:', city)

    try {
        const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=da`
        console.log('🌐 Forecast API URL:', url.replace(API_KEY, '***'))

        const response = await fetch(url)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ Forecast API Error:', response.status, errorText)
            throw new Error(`Forecast API Error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('✅ Live forecast data received:', data)

        const dailyData = data.list.filter((item: any, index: number) => index % 8 === 0) // Get one reading per day

        const days = ['I dag', 'I morgen', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag']

        const forecastData = dailyData.slice(0, 7).map((day: any, index: number) => {
            const weatherCode = day.weather[0].id
            const weatherInfo = getWeatherCondition(weatherCode)

            return {
                date: day.dt_txt,
                day: days[index] || `Dag ${index + 1}`,
                temp: Math.round(day.main.temp),
                condition: weatherInfo.condition,
                icon: weatherInfo.icon,
                weatherCode: weatherCode
            }
        })

        console.log('🌤️ Processed forecast data:', forecastData)
        return forecastData
    } catch (error) {
        console.error('❌ Error fetching forecast data:', error)
        console.log('🔄 Falling back to mock forecast data')
        // Return fallback data
        return [
            { date: '2024-01-15', day: 'I dag', temp: 18, condition: 'Partly Cloudy', icon: '⛅', weatherCode: 801 },
            { date: '2024-01-16', day: 'I morgen', temp: 16, condition: 'Rain', icon: '🌧️', weatherCode: 500 },
            { date: '2024-01-17', day: 'Onsdag', temp: 14, condition: 'Cloudy', icon: '☁️', weatherCode: 803 },
            { date: '2024-01-18', day: 'Torsdag', temp: 17, condition: 'Sunny', icon: '☀️', weatherCode: 800 },
            { date: '2024-01-19', day: 'Fredag', temp: 19, condition: 'Partly Cloudy', icon: '⛅', weatherCode: 801 },
            { date: '2024-01-20', day: 'Lørdag', temp: 21, condition: 'Sunny', icon: '☀️', weatherCode: 800 },
            { date: '2024-01-21', day: 'Søndag', temp: 20, condition: 'Partly Cloudy', icon: '⛅', weatherCode: 801 }
        ]
    }
} 