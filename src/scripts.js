// importing the scss into JS
import "./styles.scss"

const inputSearch = document.getElementById('input-city')
const inputSearchMobile = document.getElementById('input-city-mobile')
const searchForm = document.getElementById('search-form')
const searchFormMob = document.querySelector('.searchFormMob')

const loaderScreen = document.querySelector('#loader')
const mainScreen = document.querySelector('main')
const cityNames = document.querySelectorAll('.city-name')
const country = document.getElementById('country')
const temps = document.querySelectorAll('.temp')
const bottomCurrentLocTime = document.querySelector('#timeonly')
const bottomCurrentLocData = document.querySelector('#user-loc-data')
const bigClock = document.querySelector('#big-clock p')
const bigClockDate = document.querySelector('#big-clock span')
const behaviorElem = document.querySelector('#behavior')
const iconElem = document.querySelector('.weather-icon img')
const mobileIcon = document.querySelector('.tempr img')
const humidityElem = document.querySelector('#d-humid-value')
const visibilityElem = document.querySelector('#d-visib-value')
const windElem = document.querySelector('#d-wind-value')
const descElem = document.querySelectorAll('.desc')
const mobBehavior = document.querySelectorAll('.bhv')
const mobDesc1 = document.querySelectorAll(".dtls span")[0]
const mobDesc2 = document.querySelectorAll(".dtls span")[1]
const mobDesc3 = document.querySelectorAll(".dtls span")[2]
const mobDesc4 = document.querySelectorAll(".dtls span")[3]
const mobClock = document.getElementById('mob-clock')
const mobUserLoc = document.getElementById('mob-user-location')
const mobUserTemp = document.getElementById('mob-user-temp')
const mobBehaviorCity = document.querySelector('.tempr .bhv')

function timeClock(city) {
    const d = new Date()
    let hrs = d.getHours()
    let mins = d.getMinutes()
    let secs = d.getSeconds()
    let ampm = hrs >= 12 ? 'PM' : 'AM' 

    hrs = hrs % 12
    hrs = hrs === 0 ? 12 : hrs
    hrs = hrs < 10 ? `0${hrs}` : hrs
    mins = mins < 10 ? `0${mins}` : mins
    secs = secs < 10 ? `0${secs}` : secs

    if (city === false) {
        bottomCurrentLocTime.innerHTML = `${hrs}:${mins}:${secs} ${ampm}, ${d.toDateString()}`
        bigClock.innerHTML = `${hrs}:${mins}:${secs} ${ampm}`
        bigClockDate.innerHTML = d.toDateString()
        mobClock.innerHTML = `${hrs}:${mins}:${secs} ${ampm}, ${d.toDateString()}`
    } else {
        bigClock.innerHTML = `${hrs}:${mins}:${secs} ${ampm}`
        bigClockDate.innerHTML = d.toDateString()
        mobClock.innerHTML = `${hrs}:${mins}:${secs} ${ampm}, ${d.toDateString()}`
    }
}

const weather = {
    "apiKey": "3c0d50d5f3d10960f5b46a4534217bc9",
    fetchWeatherByCity: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeatherCity(data));
    },
    fetchWeatherByPos: function (lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeatherLocation(data))
    },
    date: new Date(),
    displayWeatherLocation: function (data) {
        if (data !== undefined) {
            const { name, sys, visibility } = data;
            const { icon, main, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            loaderScreen.classList.remove('loader')
            loaderScreen.classList.add('none')
            mainScreen.classList.remove('none')
            mainScreen.classList.add('main')

            const city = false
            setInterval(() => timeClock(city), 10)

            cityNames.forEach(item => item.innerHTML = name)
            country.innerHTML = sys.country
            temps.forEach(item => item.innerHTML = `${Math.round(temp)} &#176;c`)
            bottomCurrentLocData.innerHTML = name + '&nbsp;'
            behaviorElem.innerHTML = main
            iconElem.src = `https://openweathermap.org/img/wn/${icon}.png`
            mobileIcon.src = `https://openweathermap.org/img/wn/${icon}.png`
            humidityElem.innerHTML = humidity
            visibilityElem.innerHTML = visibility
            windElem.innerHTML = `${speed} km / h`
            descElem.forEach(item => item.innerHTML = description)
            mobDesc1.innerHTML = humidity
            mobDesc2.innerHTML = visibility
            mobDesc3.innerHTML = speed
            mobDesc4.innerHTML = description
            mobBehavior.forEach(item => item.innerHTML = main)
            mobUserLoc.innerHTML = name + "&nbsp;"
            mobUserTemp.innerHTML = Math.round(temp)
        }
    },
    displayWeatherCity: function (data) {
        if (data !== undefined) {
            const { name, sys, visibility } = data;
            const { icon, main, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            const city = true
            setInterval(() => timeClock(city), 10)

            cityNames.forEach(item => item.innerHTML = name)
            country.innerHTML = sys.country
            temps.forEach(item => item.innerHTML = `${Math.round(temp)} &#176;c`)
            behaviorElem.innerHTML = main
            iconElem.src = `https://openweathermap.org/img/wn/${icon}.png`
            mobileIcon.src = `https://openweathermap.org/img/wn/${icon}.png`
            humidityElem.innerHTML = humidity
            visibilityElem.innerHTML = visibility
            windElem.innerHTML = `${speed} km / h`
            descElem.forEach(item => item.innerHTML = description)
            mobBehaviorCity.innerHTML = main
        }
    }
};

const bgImage = {
    "unsplashKey": "X8dJgrxxFyrSQtpRB_RXasjm3AdpnA38l3Q-dN8roqA",
    fetchImage: function (city) {
        fetch("https://api.unsplash.com/search/photos?page=1&query=" + city + "&client_id=" + this.unsplashKey)
            .then((response) => response.json())
            .then((imgObj) => this.displayImage(imgObj));
    },
    displayImage: function (imgObj) {
        const { regular } = imgObj.results[1].urls;
        // console.log(imgObj);

        // document.querySelector('.left').style.background = `url(${regular}) no-repeat center`
        // document.querySelector('.left').style.backgroundSize = `cover`
        document.body.style.background = "url("+ regular +") no-repeat center";
        document.body.style.backgroundSize = "cover";
    }
}

const getLocation = new Promise((resolve, reject) => {
    const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
    }
    function success(pos) {
        const crds = pos.coords
        resolve(crds)
    }
    function error(err) {
        reject(`Error: ${err.code}! ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
})

// this is to get the location info from user's browser
const getUserLocation = {
    userLocation: () => {
        if (navigator.geolocation) {
            getLocation
                .then((pos) => {
                    const { latitude, longitude, accuracy } = pos
                    weather.fetchWeatherByPos(latitude, longitude)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert("GeoLocation not available!")
        }
    }
}
getUserLocation.userLocation()

function searchCityWeather() {
    const city = inputSearch.value
    const cityMob = inputSearchMobile.value
    weather.fetchWeatherByCity(city || cityMob)
    bgImage.fetchImage(city || cityMob)
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    searchCityWeather()
    inputSearch.value = ""
})
searchFormMob.addEventListener("submit", (e) => {
    e.preventDefault()
    searchCityWeather()
    inputSearchMobile.value = ""
})
