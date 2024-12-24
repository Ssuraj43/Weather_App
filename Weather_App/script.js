const apiKey = "e2ba0362a64b1ee50e718aa8869ed029";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weatherContainer = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        handleError(error);
    }
}

function displayWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    // Set the weather icon based on the weather condition
    const weatherCondition = data.weather[0].main;
    setWeatherIcon(weatherCondition);

    weatherContainer.style.display = "block";
    errorMessage.style.display = "none";
}

function setWeatherIcon(condition) {
    if (condition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (condition === "Snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        weatherIcon.src = "images/default.png"; // Default icon if condition not found
    }
}

function handleError(error) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = error.message; // Display the error message
    weatherContainer.style.display = "none";
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Trim whitespace
    if (city) {
        checkWeather(city);
    } else {
        handleError(new Error("Please enter a city name")); // Handle empty input
    }
});