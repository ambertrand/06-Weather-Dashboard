$(document).ready(function () {

    // API weather key
    const weatherKey = "6c911f8e164e26c52b3af8b48bceac95"
    



    $(".searchButton").on("click", function () {
        // console.log("clicked");

    });

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response)
    
})




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