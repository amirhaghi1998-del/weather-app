// 1. DOM variable definitions
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherInfoDiv = document.getElementById('weatherInfo');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// 2. Put your API key here
const API_KEY = '4f06a336b2f143a193c0cd628d367649'; // ← replace with your key

// 3. Function to fetch weather data
async function getWeather(city) {
    // Show loading and hide others
    showLoading();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;

    try {
        const response = await fetch(url);
        
        // If response is not successful (e.g., 404)
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

// 4. Display weather information on the page
function displayWeather(data) {
    // Fill in information from the received JSON
    cityName.textContent = data.name + ', ' + data.sys.country;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = Math.round(data.main.temp) + '°C';
    humidity.textContent = data.main.humidity + '%';
    windSpeed.textContent = data.wind.speed + ' m/s';

    // Weather condition icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Show weather info and hide loading/error
    hideLoading();
    hideError();
    weatherInfoDiv.classList.remove('hidden');
}

// 5. Helper functions for UI management

function showLoading() {
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherInfoDiv.classList.add('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(message) {
    loadingDiv.classList.add('hidden');
    weatherInfoDiv.classList.add('hidden');
    errorDiv.textContent = '⚠️ ' + message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}

// 6. Click event on search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// 7. Press Enter key in input field
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// 8. (Optional) Search for a default city on page load
// getWeather('Tehran');