// script.js
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("City");

let getWeather = () => {
    let cityValue = cityRef.value;
    if (cityValue.length === 0) {
        result.innerHTML = '<h3 class="msg">Please Enter a City Name</h3>';
    } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

        cityRef.value = "";
        fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok ' + resp.statusText);
                }
                return resp.json();
            })
            .then(data => {
                console.log(data);
                result.innerHTML = `
                    <h2>${data.name}</h2>
                    <h4 class="weather">${data.weather[0].main}</h4>
                    <h4 class="desc">${data.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                    <h1>${data.main.temp} &#176;C</h1>
                    <div class="temp-container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${data.main.temp_min} &#176;C</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${data.main.temp_max} &#176;C</h4>
                        </div>
                    </div>
                `;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                result.innerHTML = '<h3 class="msg">City not Found</h3>';
            });
    }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
