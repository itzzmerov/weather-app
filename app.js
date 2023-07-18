function getWeatherData(location) {
    const apiKey = "6f87f36eaca7393d6c296b2ae95600f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherData = {
            temperature: data.main.temp,
            condition: data.weather[0].main,
            location: data.name,
        };
        return weatherData;
    });
}
function updateUI(weatherData) {
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const location = document.querySelector("#location");

    temperature.textContent = `${weatherData.temperature}°C`;
    condition.textContent = weatherData.condition;
    location.textContent = weatherData.location;
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
    const location = searchBar.value;
    getWeatherData(location)
        .then(weatherData => {
            updateUI(weatherData);
        })
        .catch(error => {
            console.log(error);
        });
});