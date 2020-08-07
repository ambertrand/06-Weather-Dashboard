$(document).ready(function () {
    // $(".populateCityInfo").hide("none");
    // $(".forecastHeader").hide("none");

    // API weather key
    const weatherKey = "6c911f8e164e26c52b3af8b48bceac95";

    let todaysDate = moment().format('L');
    let forecast = moment().format('l');

    let city = "";
    let storedList = $(".cityList")

    function cityHistoryList(cityName) {
        let cityArray = localStorage.getItem("cityName");
        console.log(cityArray);
        cityArray = JSON.parse(cityArray) || [];
        cityArray.push(cityName);
        localStorage.setItem("cityName", JSON.stringify(cityArray));

        let buttonList = $("<div>").addClass('col-12')
        let buttonItem = $("<button>").addClass('btn btn-link savedCity mb-2');
        buttonList.append(buttonItem);
        storedList.append(buttonList);
        buttonItem.html(city);
    }
    

    function uvColor(uv) {
        if (uv < 3) {
            return "green";
        }else if (uv >= 3 && uv < 6) {
            return "yellow";
        }else if (uv >= 6  && uv < 8) {
            return "orange";
        }else if (uv >= 8 && uv < 11) {
            return "red"
        }else return "purple"
    }


    $(".searchButton").on("click", function () {
        // console.log("clicked");
        
        city = $(".cityInput").val();
        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
        // $(".cityDate").html(city);
        
        cityHistoryList(city);
        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let cityName = response.name
                let temperature = Math.round(((response.main.temp - 273.15) * 1.8 + 32));
                let Icon = response.weather[0].icon
                let humidity = response.main.humidity;
                let windSpeed = response.wind.speed;
                
                $(".cityDate").append(`${cityName} (${todaysDate})`)
                $(".currentTempVal").append(temperature);
                $(".weatherIcon").attr("src", `http://openweathermap.org/img/wn/${Icon}.png`).attr("alt", response.weather[0].description);
                $(".currentHumidityVal").append(humidity);
                $(".currentWindVal").append(windSpeed);
                

                let latitude = response.coord.lat;
                let longitude = response.coord.lon;

                let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
                &appid=${weatherKey}`;

                $.ajax({
                    url: oneCallUrl,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    let uv = response.current.uvi;
                    let uvIndex = uvColor(uv);
                    let fiveDayWeather = response.daily
                    $(".currentUvVal").append(uv);
                    $(".currentUvVal").attr("style", `background-color: ${uvIndex}; color: ${uvIndex === "yellow" ? "black" : "white"}`);
                    
                    // for (let i = 0; i <= 5; i++) {
                    //     let fiveDay = fiveDayWeather[i + 1];
                    //     console.log(fiveDay);
                        // $(".forecastDate").append(forecast)
                    // }
                })
                
            });
      
        // $(".populateCityInfo").show("display");
        // $(".forecastHeader").show("display");
    });
});




//Pseudo code
// UV index: <3 -> green  3-5 -> yellow 6-7 -> orange  8-10 -> red 11+ ->violet



// ## Acceptance Criteria

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast