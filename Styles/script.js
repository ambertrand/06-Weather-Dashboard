$(document).ready(function () {
    $(".populateCityInfo").hide("none");
    $(".forecastHeader").hide("none");

    // API weather key
    const weatherKey = "6c911f8e164e26c52b3af8b48bceac95";

    // Variables
    const storedList = $(".cityList")
    const searchBtn = $(".searchButton")
    const cityDateEl = $(".cityDate")
    const currentTempEl = $(".currentTempVal")
    const weatherIcon = $(".weatherIcon")
    const currentHumidityEl = $(".currentHumidityVal")
    const currentWindEl = $(".currentWindVal")

    let todaysDate = moment().format('L');
    let cityName = "";

    getLocalStorage();

    // FUNCTIONS
    function ajax(response) {

        city = $(".cityInput").val();
        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;

        cityHistoryList(city);
        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                cityName = response.name
                temperature = Math.round(((response.main.temp - 273.15) * 1.8 + 32));
                Icon = response.weather[0].icon
                humidity = response.main.humidity;
                windSpeed = response.wind.speed;

                cityDateEl.html(`${cityName} (${todaysDate})`)
                currentTempEl.html(temperature);
                weatherIcon.attr("src", `http://openweathermap.org/img/wn/${Icon}.png`).attr("alt", response.weather[0].description);
                currentHumidityEl.html(humidity);
                currentWindEl.html(windSpeed);


                let latitude = response.coord.lat;
                let longitude = response.coord.lon;

                let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
                &appid=${weatherKey}`;

                $.ajax({
                    url: oneCallUrl,
                    method: "GET"
                }).then(function (response) {
                    let uv = response.current.uvi;
                    let uvIndex = uvColor(uv);
                    let fiveDayWeather = response.daily
                    $(".currentUvVal").html(uv);
                    $(".currentUvVal").attr("style", `background-color: ${uvIndex}; color: ${uvIndex === "yellow" ? "black" : "white"}`);

                    for (let i = 0; i <= 5; i++) {
                        let currentDay = fiveDayWeather[i]
                        $(`div.day-${i} .forecastDate`).text(moment.unix(currentDay.dt).format('l'));
                        $(`div.day-${i} .forecastPic`).attr('src', `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}.png`).attr('alt', currentDay.weather[0].description);
                        $(`div.day-${i} .tempValue`).text(Math.round((currentDay.temp.day - 273.15) * 1.8 + 32));
                        $(`div.day-${i} .humidityValue`).text(currentDay.humidity);
                    }
                })

            });

        $(".populateCityInfo").show("display");
        $(".forecastHeader").show("display");
    };

    // Function to add the last 5 recently searched cities
    function cityHistoryList(cityName) {
        let cityArray = localStorage.getItem("cityName");
        cityArray = JSON.parse(cityArray) || [];
        cityArray.push(cityName);
        localStorage.setItem("cityName", JSON.stringify(cityArray));

        let buttonList = $("<div>").addClass('col-12')
        let buttonItem = $("<button>").addClass('btn btn-link savedCity mb-2');
        buttonList.append(buttonItem);
        storedList.append(buttonList);
        buttonItem.html(city);
    };

    function getLocalStorage() {
        let cityList = [];
        cityList = JSON.parse(localStorage.getItem("cityName"));
        if (cityList !== null) {

            for (let i = 0; i < cityList.length; i++) {

                let buttonList = $("<div>").addClass('col-12')
                let buttonItem = $("<button>").addClass('btn btn-link savedCity mb-2');
                buttonList.append(buttonItem);
                storedList.append(buttonList);
                buttonItem.html(cityList[i]);
            } if (cityList[0]) {
                city = cityList[cityList.length - 1];
                apiReload();
                cityDateEl.html(`${cityName} (${todaysDate})`);
            }
        }
    }

    // Function adds background color based on current UV Index number
    function uvColor(uv) {
        if (uv < 3) {
            return "green";
        } else if (uv >= 3 && uv < 6) {
            return "yellow";
        } else if (uv >= 6 && uv < 8) {
            return "orange";
        } else if (uv >= 8 && uv < 11) {
            return "red"
        } else return "purple"
    };


    function apiReload() {

        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;


        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                cityName = response.name
                temperature = Math.round(((response.main.temp - 273.15) * 1.8 + 32));
                Icon = response.weather[0].icon
                humidity = response.main.humidity;
                windSpeed = response.wind.speed;

                cityDateEl.html(`${cityName} (${todaysDate})`)
                currentTempEl.html(temperature);
                weatherIcon.attr("src", `http://openweathermap.org/img/wn/${Icon}.png`).attr("alt", response.weather[0].description);
                currentHumidityEl.html(humidity);
                currentWindEl.html(windSpeed);


                let latitude = response.coord.lat;
                let longitude = response.coord.lon;

                let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
                &appid=${weatherKey}`;

                $.ajax({
                    url: oneCallUrl,
                    method: "GET"
                }).then(function (response) {
                    let uv = response.current.uvi;
                    let uvIndex = uvColor(uv);
                    let fiveDayWeather = response.daily
                    $(".currentUvVal").html(uv);
                    $(".currentUvVal").attr("style", `background-color: ${uvIndex}; color: ${uvIndex === "yellow" ? "black" : "white"}`);

                    for (let i = 0; i <= 5; i++) {
                        let currentDay = fiveDayWeather[i]
                        $(`div.day-${i} .forecastDate`).text(moment.unix(currentDay.dt).format('l'));
                        $(`div.day-${i} .forecastPic`).attr('src', `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}.png`).attr('alt', currentDay.weather[0].description);
                        $(`div.day-${i} .tempValue`).text(Math.round((currentDay.temp.day - 273.15) * 1.8 + 32));
                        $(`div.day-${i} .humidityValue`).text(currentDay.humidity);
                    }
                })

            });
        $(".populateCityInfo").show("display");
        $(".forecastHeader").show("display");
    }

    // Event Listeners
    searchBtn.on("click", function (event) {
        event.preventDefault();
        ajax();
    });

    $(".savedCity").on("click",function(event) {
        event.preventDefault();
        city = $(this).text();
        apiReload();
    })

});
