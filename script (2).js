
const API_KEY = '876e107a6cac3e4e9a05975d253b5968';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const popularCities = [
    'San Francisco', 'New York', 'London', 'Tokyo', 'Paris',
    'Sydney', 'Dubai', 'Singapore', 'Toronto', 'Berlin'
];

window.onload = () => {
    document.getElementById('city').value = 'San Francisco';
    getWeather();
    setupCitySuggestions();
};

function setupCitySuggestions() {
    const input = document.getElementById('city');
    const suggestionsList = document.getElementById('suggestions');

    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        if (value.length < 2) {
            suggestionsList.innerHTML = '';
            return;
        }

        const suggestions = popularCities.filter(city => 
            city.toLowerCase().includes(value)
        );

        suggestionsList.innerHTML = suggestions
            .map(city => `<div class="suggestion" onclick="selectCity('${city}')">${city}</div>`)
            .join('');
    });
}

function selectCity(city) {
    document.getElementById('city').value = city;
    document.getElementById('suggestions').innerHTML = '';
    getWeather();
}

async function getWeather() {
    const city = document.getElementById('city').value || 'San Francisco';

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found!');
            return;
        }

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    } catch (error) {
        alert('Error fetching weather data!');
    }
}
