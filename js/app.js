// Weather App JavaScript

// API Configuration
const API_KEY = '7c5fe42dc3c84c14a9c185236251003'; // API key implemented
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const daySelect = document.getElementById('day-select');
const locationElement = document.getElementById('location');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weather-description');
const weatherIconElement = document.getElementById('weather-icon');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const themeBtn = document.getElementById('theme-btn');
const enBtn = document.getElementById('en-btn');
const hiBtn = document.getElementById('hi-btn');
const appNameElement = document.getElementById('app-name');
const footerTextElement = document.getElementById('footer-text');

// App State
let currentLanguage = 'en';
let currentLocation = 'London'; // Default location
let weatherData = null;
let forecastData = [];

// Initialize the app
function initApp() {
    // Set default day to current day
    const today = new Date().getDay();
    daySelect.value = today;
    
    // Add event listeners
    searchBtn.addEventListener('click', handleSearch);
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    daySelect.addEventListener('change', updateWeatherDisplay);
    themeBtn.addEventListener('click', toggleTheme);
    enBtn.addEventListener('click', () => setLanguage('en'));
    hiBtn.addEventListener('click', () => setLanguage('hi'));
    
    // Load user preferences from localStorage
    loadUserPreferences();
    
    // Initial weather fetch
    fetchWeatherData(currentLocation);
}

// Load user preferences from localStorage
function loadUserPreferences() {
    // Load theme preference
    const savedTheme = localStorage.getItem('weatherAppTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Load language preference
    const savedLanguage = localStorage.getItem('weatherAppLanguage');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    }
    
    // Load last location
    const savedLocation = localStorage.getItem('weatherAppLocation');
    if (savedLocation) {
        currentLocation = savedLocation;
        locationInput.value = savedLocation;
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    
    // Update theme button icon
    themeBtn.innerHTML = isDarkTheme 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    
    // Save preference to localStorage
    localStorage.setItem('weatherAppTheme', isDarkTheme ? 'dark' : 'light');
}

// Set the application language
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button state
    if (lang === 'en') {
        enBtn.classList.add('active');
        hiBtn.classList.remove('active');
    } else {
        hiBtn.classList.add('active');
        enBtn.classList.remove('active');
    }
    
    // Update UI text
    updateUILanguage();
    
    // Save preference to localStorage
    localStorage.setItem('weatherAppLanguage', lang);
    
    // Update weather display if we have data
    if (weatherData) {
        updateWeatherDisplay();
    }
}

// Update UI elements with selected language
function updateUILanguage() {
    const t = translations[currentLanguage];
    
    // Update static UI elements
    appNameElement.textContent = t.appName;
    locationInput.placeholder = t.locationPlaceholder;
    footerTextElement.textContent = t.footerText;
    
    // Update day selector options
    Array.from(daySelect.options).forEach((option, index) => {
        option.textContent = t.days[index];
    });
}

// Handle search button click
function handleSearch() {
    const location = locationInput.value.trim();
    if (location) {
        currentLocation = location;
        fetchWeatherData(location);
        
        // Save to localStorage
        localStorage.setItem('weatherAppLocation', location);
    }
}

// Fetch weather data from API
async function fetchWeatherData(location) {
    try {
        showLoading(true);
        showError(false);
        
        const response = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        const data = await response.json();
        
        // Store the data
        weatherData = data;
        forecastData = data.forecast.forecastday;
        
        // Update the UI
        updateWeatherDisplay();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(true, error.message === 'Location not found' ? 'locationNotFound' : 'apiError');
    } finally {
        showLoading(false);
    }
}

// Update weather display based on selected day
function updateWeatherDisplay() {
    if (!weatherData || !forecastData.length) return;
    
    const selectedDayIndex = parseInt(daySelect.value);
    const today = new Date().getDay();
    
    // Find the forecast day that matches the selected day of week
    let targetDate;
    let forecastDay;
    
    if (selectedDayIndex === today) {
        // If today is selected, use current data
        forecastDay = forecastData[0];
        targetDate = new Date();
    } else {
        // Find the next occurrence of the selected day
        const daysToAdd = (selectedDayIndex - today + 7) % 7;
        targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysToAdd);
        
        // Find the forecast that matches this date
        const targetDateString = targetDate.toISOString().split('T')[0];
        forecastDay = forecastData.find(day => day.date === targetDateString);
        
        // If not found in forecast (beyond 7 days), use the last available day
        if (!forecastDay) {
            forecastDay = forecastData[forecastData.length - 1];
            targetDate = new Date(forecastDay.date);
        }
    }
    
    // Get day condition
    const dayCondition = forecastDay.day.condition;
    
    // Update UI elements
    locationElement.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
    
    // Format and display date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = targetDate.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'hi-IN', options);
    
    // Update temperature
    temperatureElement.textContent = `${Math.round(forecastDay.day.avgtemp_c)}${translations[currentLanguage].temperatureUnit}`;
    
    // Update weather description
    const conditionText = dayCondition.text.toLowerCase();
    let weatherCode = 'clear';
    
    // Map condition text to our translation keys
    if (conditionText.includes('sunny') || conditionText.includes('clear')) {
        weatherCode = 'sunny';
    } else if (conditionText.includes('partly cloudy')) {
        weatherCode = 'partly-cloudy';
    } else if (conditionText.includes('cloudy') || conditionText.includes('overcast')) {
        weatherCode = 'cloudy';
    } else if (conditionText.includes('mist')) {
        weatherCode = 'mist';
    } else if (conditionText.includes('fog')) {
        weatherCode = 'fog';
    } else if (conditionText.includes('rain') && conditionText.includes('patchy')) {
        weatherCode = 'patchy-rain';
    } else if (conditionText.includes('rain') && conditionText.includes('heavy')) {
        weatherCode = 'heavy-rain';
    } else if (conditionText.includes('rain')) {
        weatherCode = 'rain';
    } else if (conditionText.includes('snow')) {
        weatherCode = 'snow';
    } else if (conditionText.includes('thunder')) {
        weatherCode = 'thunderstorm';
    }
    
    weatherDescriptionElement.textContent = translations[currentLanguage].weatherDescriptions[weatherCode];
    
    // Update weather icon
    weatherIconElement.src = dayCondition.icon.startsWith('//') 
        ? `https:${dayCondition.icon}` 
        : dayCondition.icon;
    
    // Update wind and humidity
    windElement.textContent = `${forecastDay.day.maxwind_kph} ${translations[currentLanguage].windSpeed}`;
    humidityElement.textContent = `${forecastDay.day.avghumidity}%`;
}

// Show/hide loading spinner
function showLoading(show) {
    const loadingElement = document.querySelector('.loading');
    if (!loadingElement) {
        // Create loading element if it doesn't exist
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
        document.querySelector('.weather-container').before(loadingDiv);
    }
    
    document.querySelector('.loading').classList.toggle('active', show);
}

// Show/hide error message
function showError(show, errorType = 'apiError') {
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
        // Create error element if it doesn't exist
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        document.querySelector('.weather-container').before(errorElement);
    }
    
    if (show) {
        errorElement.textContent = translations[currentLanguage].errorMessages[errorType];
        errorElement.classList.add('active');
    } else {
        errorElement.classList.remove('active');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 