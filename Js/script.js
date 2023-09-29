`use strict`;
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
function Last7Days() {

  var today = new Date();
  var oneDayAgo = new Date(today);
  var twoDaysAgo = new Date(today);
  var threeDaysAgo = new Date(today);
  var fourDaysAgo = new Date(today);
  var fiveDaysAgo = new Date(today);
  var sixDaysAgo = new Date(today);
  var sevenDaysAgo = new Date(today);

  oneDayAgo.setDate(today.getDate() - 1);
  twoDaysAgo.setDate(today.getDate() - 2);
  threeDaysAgo.setDate(today.getDate() - 3);
  fourDaysAgo.setDate(today.getDate() - 4);
  fiveDaysAgo.setDate(today.getDate() - 5);
  sixDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setDate(today.getDate() - 7);

  var result0 = formatDate(today);
  var result1 = formatDate(oneDayAgo);
  var result2 = formatDate(twoDaysAgo);
  var result3 = formatDate(threeDaysAgo);
  var result4 = formatDate(fourDaysAgo);
  var result5 = formatDate(fiveDaysAgo);
  var result6 = formatDate(sixDaysAgo);
  var result7 = formatDate(sevenDaysAgo);

  var result = { result0, result1, result2, result3, result4, result5, result6, result7 };
  // var result = result0+","+result1+","+result2+","+result3+","+result4+","+result5+","+result6+","+result7;
  // console.log(result);
  return (result);
}

function formatDate(date) {

  // var dd = date.getDate();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm }
  // date = mm+'/'+dd+'/'+yyyy;
  date = yyyy + '-' + mm + '-' + dd;
  return date
}
function historyWeather(location) {
  let dateArray = [Last7Days.result0, Last7Days.result1, Last7Days.result2, Last7Days.result3, Last7Days.result4, Last7Days.result5];
}