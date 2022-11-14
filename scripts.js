const weather = {
    "apiKey" : "3c0d50d5f3d10960f5b46a4534217bc9",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);

        document.querySelector('.city').innerHTML = name;
        document.querySelector('.temperature').innerHTML = temp + " &#8451;";
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.w-type').innerHTML = description;
        document.querySelector('.humidity').innerHTML = "Humidity: " + humidity;
        document.querySelector('.wind').innerHTML = "Wind speed: " + speed + " km/h";
    },
    search: function() {
        this.fetchWeather(document.querySelector('.searchbar').value);
        document.querySelector('.weather-info').classList.remove('loading');
    }
};

const bgImage = {
    "unsplashKey": "X8dJgrxxFyrSQtpRB_RXasjm3AdpnA38l3Q-dN8roqA",
    fetchImage: function(city) {
        fetch("https://api.unsplash.com/search/photos?page=1&query=" + city + "&client_id=" + this.unsplashKey)
        .then((response) => response.json())
        .then((dataImg) => this.displayImage(dataImg));
    },
    displayImage: function(dataImg) {
        const { regular } = dataImg.results[1].urls;
        console.log(regular);

        document.body.style.background = "url("+ regular +") no-repeat center";
        document.body.style.backgroundSize = "cover";
    }
}

document.querySelector('.searchBtn').addEventListener("click", ()=> {
    weather.search();
    bgImage.fetchImage(document.querySelector('.searchbar').value);
});

document.querySelector('.searchbar').addEventListener("keypress", (e)=> {
    if(e.key == "Enter") {
        weather.search();
        bgImage.fetchImage(document.querySelector('.searchbar').value);
    }
})