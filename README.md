# Weather App

A responsive and visually appealing weather web application built with HTML, CSS, and JavaScript.

## Features

- **Language Toggle**: Switch between Hindi and English
- **Weather Search by Day of the Week**: Select any day of the week to get weather details
- **Weather Representation with Icons**: Display weather conditions using appropriate icons
- **Modern UI Design**: CSS animations, flexbox/grid layout, and a sleek color scheme
- **Fully Responsive**: Works well on desktop, tablets, and mobile screens
- **Weather API Integration**: Fetches weather data from WeatherAPI
- **Dark & Light Mode**: Toggle between dark and light themes
- **Local Storage**: Remembers user preferences (language, theme, last location)

## Setup Instructions

1. Clone this repository to your local machine
2. Sign up for a free API key at [WeatherAPI](https://www.weatherapi.com/)
3. Open `js/app.js` and replace `'YOUR_WEATHERAPI_KEY'` with your actual API key
4. Open `index.html` in your browser to use the application

## API Key Configuration

This application uses the WeatherAPI service to fetch weather data. You need to:

1. Register for a free account at [WeatherAPI](https://www.weatherapi.com/)
2. Get your API key from the dashboard
3. Replace the placeholder in the `js/app.js` file:

```javascript
const API_KEY = 'YOUR_WEATHERAPI_KEY'; // Replace with your actual WeatherAPI key
```

## Project Structure

- `index.html` - Main HTML file
- `css/style.css` - Styling for the application
- `js/app.js` - Main JavaScript functionality
- `js/translations.js` - Language translations (English and Hindi)

## Browser Compatibility

This application is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) 