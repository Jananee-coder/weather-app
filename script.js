// HTML eke elements tika JavaScript walata gannawa
let cityInput = document.getElementById("cityInput");
let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let condition = document.getElementById("condition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");

// async = API data enakan wait karanna puluwan
async function getWeather() {

    // User input karapu city name eka gannawa
    const cityName = cityInput.value.trim();

    // City name eka empty da kiyala check karanawa
    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    try {

        // City eke location eka hoyanawa

        // fetch() = API ekata request ekak yawanawa
        // await = API response eka enakan wait karanawa
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );

        // API response eka JSON data walata convert karanawa
        const locationData = await locationResponse.json();

        // City eka API eken hambune nathnam message ekak pennanawa
        if (!locationData.results) {
            alert("City not found!");
            return;
        }

        // results list eke first city eka gannawa
        const location = locationData.results[0];

        // City eke latitude eka gannawa
        const latitude = location.latitude;

        // City eke longitude eka gannawa
        const longitude = location.longitude;


        // City eke weather data gannawa

        // Latitude saha longitude API URL ekata yawanawa
        // current = danata thiyena weather data
        // temperature_2m = 2m height eke temperature
        // relative_humidity_2m = humidity
        // weather_code = weather condition code
        // wind_speed_10m = 10m height eke wind speed
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );


        // Weather API response eka JSON walata convert karanawa
        const weatherData = await weatherResponse.json();


        //  Current weather data eka gannawa
        const current = weatherData.current;


        //  City name eka website eke pennanawa
        city.textContent = location.name;


        // Temperature eka website eke pennanawa
        temperature.textContent = `${current.temperature_2m} °C`;


        // Humidity eka website eke pennanawa
        humidity.textContent = `Humidity: ${current.relative_humidity_2m}%`;


        // Wind speed eka website eke pennanawa
        wind.textContent = `Wind: ${current.wind_speed_10m} km/h`;


        // Weather code eka text ekakata convert karanawa
        let weatherText = getWeatherCondition(current.weather_code);


        // Converted weather condition eka website eke pennanawa
        condition.textContent = weatherText;


    } catch (error) {

        // Error eka console eke pennanawa
        console.log(error);

        // User ta error message ekak pennanawa
        alert("Something went wrong. Please try again!");

    }
}


// Weather code eka weather condition text ekakata convert karanawa
function getWeatherCondition(code) {

    // Code 0 nam sunny
    if (code === 0) {
        return "Sunny ☀️";
    }

    // Code 1 - 3 nam cloudy
    if (code >= 1 && code <= 3) {
        return "Cloudy ☁️";
    }

    // Code 51 - 67 nam rain
    if (code >= 51 && code <= 67) {
        return "Rain 🌧️";
    }

    // Code 80 - 82 nam rain
    if (code >= 80 && code <= 82) {
        return "Rain 🌧️";
    }

    // Code 95 or greater nam thunderstorm
    if (code >= 95) {
        return "Thunderstorm ⛈️";
    }

    // Above conditions walata match nowunoth
    return "Weather condition";
}

