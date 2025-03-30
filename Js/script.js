"use strict";

const API_KEY = "be613ef740984fda9ae155111231909";
const DEFAULT_LOCATION = "colombo";

// DOM Elements
const elements = {
  searchField: document.getElementById("searchField"),
  locationName: document.querySelector(".location-name"),
  currentDate: document.querySelector(".current-date"),
  currentTemp: document.querySelector(".current-temp"),
  weatherIcon: document.querySelector(".weather-icon"),
  weatherDescription: document.querySelector(".weather-description"),
  wind: document.querySelector(".lblWind"),
  humidity: document.querySelector(".lblHumidity"),
  pressure: document.querySelector(".lblPressure"),
  uv: document.querySelector(".lblUv"),
  cloudCover: document.querySelector(".lblCloudCover"),
  precipitation: document.querySelector(".lblPrecipitation"),
  forecastContainer: document.querySelector(".forecast-container"),
};

// Event Listeners
function initializeEventListeners() {
  document.addEventListener("DOMContentLoaded", () => loadDefaultLocation());
  elements.searchField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtnOnClick();
    }
  });
}

// Main Functions
async function searchBtnOnClick() {
  const location = elements.searchField.value.trim();
  if (!location) return;

  try {
    await Promise.all([currentWeather(location), forecastWeather(location)]);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // TODO: Add proper error handling UI
  }
}

function loadDefaultLocation() {
  currentWeather(DEFAULT_LOCATION);
  forecastWeather(DEFAULT_LOCATION);
}

// Weather API Functions
async function currentWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${location}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    updateCurrentWeather(data);
  } catch (error) {
    console.error("Error in currentWeather:", error);
    throw error;
  }
}

async function forecastWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    updateForecast(data.forecast.forecastday);
  } catch (error) {
    console.error("Error in forecastWeather:", error);
    throw error;
  }
}

// UI Update Functions
function updateCurrentWeather(data) {
  const { current, location } = data;

  elements.locationName.textContent = `${location.name}, ${location.country}`;
  elements.currentDate.textContent = formatDate(new Date());
  elements.currentTemp.innerHTML = `${current.temp_c}<sup>°</sup>C`;
  elements.weatherIcon.innerHTML = `<img src="${current.condition.icon}" alt="${current.condition.text}">`;
  elements.weatherDescription.textContent = current.condition.text;

  elements.wind.textContent = `${current.wind_mph} mph`;
  elements.humidity.textContent = `${current.humidity}%`;
  elements.pressure.textContent = `${current.pressure_mb} mb`;
  elements.uv.textContent = current.uv;
  elements.cloudCover.textContent = `${current.cloud}%`;
  elements.precipitation.textContent = `${current.precip_mm} mm`;
}

function updateForecast(forecastData) {
  elements.forecastContainer.innerHTML = forecastData
    .map((day) => createForecastCard(day))
    .join("");
}

function createForecastCard(day) {
  return `
        <div class="forecast-card">
            <div class="forecast-date">${formatDate(new Date(day.date))}</div>
            <img src="${day.day.condition.icon}" alt="${
    day.day.condition.text
  }">
            <div class="forecast-temp">${day.day.avgtemp_c}<sup>°</sup>C</div>
            <p class="forecast-description">${day.day.condition.text}</p>
            <div class="forecast-details">
                <div class="forecast-detail">
                    <span>${day.day.maxtemp_c}<sup>°</sup>C</span>
                    <p>High</p>
                </div>
                <div class="forecast-detail">
                    <span>${day.day.mintemp_c}<sup>°</sup>C</span>
                    <p>Low</p>
                </div>
                <div class="forecast-detail">
                    <span>${day.day.maxwind_mph} mph</span>
                    <p>Wind</p>
                </div>
                <div class="forecast-detail">
                    <span>${day.day.avghumidity}%</span>
                    <p>Humidity</p>
                </div>
            </div>
        </div>
    `;
}

// Utility Functions
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Theme Switcher
function switchTheme() {
  document.body.classList.toggle("dark-theme");
}

// Initialize
initializeEventListeners();
