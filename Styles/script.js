$(document).ready(function () {

    // API weather key
    const weatherKey = "6c911f8e164e26c52b3af8b48bceac95"

    // Weather elements being hooked to
    const cityEl = document.querySelector(".cityInput");
    const dateEl = document.querySelector(".cityDate");
    const iconEl = document.querySelector(".weatherIcon");
    const tempEl = document.querySelector(".currentTempVal");
    const humidityEl = document.querySelector(".currentHumidityVal");
    const windEl = document.querySelector(".currentWindVal");
    const uvIndexEl = document.querySelector(".currentUvVal")



    // function weatherAPI (city, state, country) {
    //     if (city && state && country) {
    //         return `api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${weatherKey}`
    //     }else if (city && state) {
    //         return `api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${weatherKey}`
    //     }else {
    //         return `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
    //     }
    //     console.log(weatherAPI);
    // }

    // function uvIndexColor(uvi) {
    //     if (uvi < 3) {
    //         return "green";
    //     }else if (uvi >= 3 && uvi < 6) {
    //         return "yellow";
    //     }else if (uvi >= 6  && uvi < 8) {
    //         return "orange";
    //     }else if (uvi >= 8 && uvi < 11) {
    //         return "red"
    //     }else return "purple"
    // }










    $(".searchButton").on("click", function () {
        // console.log("clicked");

        let city = $(".cityInput").val();
        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;


        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let latitude = response.coord.lat;
                let longitude = response.coord.lon;

                let uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${weatherKey}&lat=${latitude}&lon=${longitude}`;

                $.ajax({
                    url: uvUrl,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                })
            });
    });



});




//Pseudo code
// UV index: <3 -> green  3-5 -> yellow 6-7 -> orange  8-10 -> red 11+ ->violet



// ## Acceptance Criteria

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast