document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '0763fa54aadfa1feb3a1ecc360e28c49';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const cityInput = document.getElementById('input');
    const searchButton = document.querySelector('.search');
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const cloudElement = document.getElementById('cloud');

    searchButton.addEventListener('click', function() {
        const cityName = cityInput.value.trim();
        if (cityName !== '') {
            fetchWeather(cityName);
        }
    });


    function fetchWeather(city) {
        const url = `${apiUrl}?q=${city}&APPID=${apiKey}&units=metric`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
    }

    function updateWeather(data) {
        cityElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `${data.main.temp} °C`;
        cloudElement.textContent = data.weather[0].description;
    }
});