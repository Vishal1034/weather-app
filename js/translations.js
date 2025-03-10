// Translations for the Weather App
const translations = {
    en: {
        appName: "Weather App",
        days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        locationPlaceholder: "Enter city name",
        searchButton: "Search",
        temperatureUnit: "°C",
        windSpeed: "km/h",
        humidity: "Humidity",
        wind: "Wind",
        footerText: "Created with ❤️ | Weather data from WeatherAPI",
        weatherDescriptions: {
            "sunny": "Sunny",
            "partly-cloudy": "Partly Cloudy",
            "cloudy": "Cloudy",
            "overcast": "Overcast",
            "mist": "Mist",
            "patchy-rain": "Patchy Rain",
            "rain": "Rain",
            "heavy-rain": "Heavy Rain",
            "snow": "Snow",
            "thunderstorm": "Thunderstorm",
            "fog": "Fog",
            "clear": "Clear"
        },
        errorMessages: {
            locationNotFound: "Location not found. Please try again.",
            networkError: "Network error. Please check your connection.",
            apiError: "Error fetching weather data. Please try again later."
        }
    },
    hi: {
        appName: "मौसम ऐप",
        days: [
            "रविवार",
            "सोमवार",
            "मंगलवार",
            "बुधवार",
            "गुरुवार",
            "शुक्रवार",
            "शनिवार"
        ],
        locationPlaceholder: "शहर का नाम दर्ज करें",
        searchButton: "खोजें",
        temperatureUnit: "°C",
        windSpeed: "किमी/घंटा",
        humidity: "आर्द्रता",
        wind: "हवा",
        footerText: "❤️ के साथ बनाया गया | मौसम डेटा WeatherAPI से",
        weatherDescriptions: {
            "sunny": "धूप",
            "partly-cloudy": "आंशिक रूप से बादल",
            "cloudy": "बादल",
            "overcast": "धुंधला",
            "mist": "कोहरा",
            "patchy-rain": "छिटपुट बारिश",
            "rain": "बारिश",
            "heavy-rain": "भारी बारिश",
            "snow": "बर्फ",
            "thunderstorm": "आंधी",
            "fog": "कुहासा",
            "clear": "साफ"
        },
        errorMessages: {
            locationNotFound: "स्थान नहीं मिला। कृपया पुन: प्रयास करें।",
            networkError: "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।",
            apiError: "मौसम डेटा प्राप्त करने में त्रुटि। कृपया बाद में पुन: प्रयास करें।"
        }
    }
};

// Export translations for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
} 