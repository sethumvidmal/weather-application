`use strict`;
const date = new Date();
function searchBtnOnClick() {
    let location = document.getElementById(`searchField`);
    currentWeather(location.value);
}
function loadDefaultLocation() {
    currentWeather(`colombo`);
};
//input field value gose here
function currentWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=be613ef740984fda9ae155111231909`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector(`.currentTemp`).innerHTML = data.current.temp_c + `<sup>o</sup>C`;
            document.querySelector(`.currentState`).innerHTML = data.current.condition.text;
            document.querySelector(`.lblWind`).innerHTML = data.current.wind_mph + `mph`;
            document.querySelector(`.lblHumidity`).innerHTML = data.current.humidity + `%`;
            document.querySelector(`.lblPressure`).innerHTML = data.current.pressure_mb + `mb`;
            document.querySelector(`.lblUv`).innerHTML = data.current.uv;
            document.querySelector(`.lblCloudCover`).innerHTML = data.current.cloud + `%`;
            document.querySelector(`.lblPrecipitation`).innerHTML = data.current.precip_mm;
            document.querySelector(`.lblLocation`).innerHTML = `${data.location.name}, ${data.location.country}`;
            document.querySelector(`.icon`).innerHTML = `<img src="${data.current.condition.icon}" class="icon">`;
        })
}
function switchTheme() {

}
