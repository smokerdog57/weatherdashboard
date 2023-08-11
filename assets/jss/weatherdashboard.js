// Global Variables
var apiKey = '1a45e27611d90610642cf73d07313c2a';
var cityName, latitude, longitude;
var currentDayWeatherArray = [];
var fiveDayWeatherArray = [];

const iconMap = {
    "01d": "fa-sun orange-icon",
    "02d": "fa-cloud-sun",
    "03d": "fa-cloud",
    "04d": "fa-cloud",
    "09d": "fa-cloud-showers-heavy",
    "10d": "fa-cloud-rain",
    "11d": "fa-bolt",
    "13d": "fa-snowflake",
    "50d": "fa-smog"
    // Add more mappings for other conditions as needed
};

//const apiKey1 = process.env.OPEN_WEATHER_API_KEY;
//const apiKey2 = process.env.google_API_KEY;

$(document).ready(function (event) {
    event.preventDefault;
    const buttonOrder = JSON.parse(localStorage.getItem('buttonOrder')) || [];

    rebuildCityButtonsFromLocalStorage(buttonOrder);

    function rebuildCityButtonsFromLocalStorage(buttonOrder) {
        const localStorageArray = Object.keys(localStorage);

        localStorageArray.forEach(function (buttonId) {

            const buttonProperties = JSON.parse(localStorage.getItem(buttonId));

            const newButton = $("<button>", {
                id: buttonId,
                class: buttonProperties.class,
                text: buttonProperties.text,
                value: buttonProperties.value
            });

            $('#savedCities').append(newButton);
        });
    }

    // event listener for city/search buttons
    $('#citySelectSearch').on('click', 'button', function (event) {
        event.preventDefault();

        if (event.target.id === "customCity" && $('#customCityInput').val().trim().length > 0) {
            cityName = $('#customCityInput').val()
            //<button id="majorCity" class="majorCityButton btn btn-secondary btn-block mb-2"></button>


            var buttonCount = $('#savedCities button').length;
            // Create a new button element
            var newButtonEl = $("<button>", {
                id: `savedCity${buttonCount + 1}`,         // Set the button's ID=savedCityn  where n = 1,2,3...
                class: 'savedCityButton btn btn-secondary btn-block mb-2',   // Set the button's class
                text: cityName,                         // Set the button's text content
                value: cityName
            });

            var newButtonAttributes = {
                id: `savedCity${buttonCount + 1}`,         // Set the button's ID=savedCityn  where n = 1,2,3...
                class: 'savedCityButton btn btn-secondary btn-block mb-2',   // Set the button's class
                text: cityName,        // Set the button's text content
                value: cityName
            };

            var newButtonId = newButtonEl.prop('id');

            // Append the new button as a child of the parent element
            $('#savedCities').prepend(newButtonEl);
            localStorage.setItem(newButtonId, JSON.stringify(newButtonAttributes));
            $('#customCityInput').val('');
        }
        else {
            cityName = event.target.value;
        }

        cityGeoConversion(cityName);
    }
    );

    function cityGeoConversion(cityName) {
        var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

        // Make the API request
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    latitude = data[0].lat;
                    longitude = data[0].lon;

                    // Now you have latitude and longitude, use them as needed
                    fetchWeatherByCoords(latitude, longitude, cityName);
                } else {
                    console.log('City not found');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function fetchWeatherByCoords(lat, lon, cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Extract relevant weather information for the 5-day forecast
                displayCurrentWeather(data);

            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            })
    }

    function displayCurrentWeather(data) {
        // Extract the current weather information for the div
        let currentWeather;
        currentWeather = data.current;

        //assign weather data to the currentDayWeatherArray
        currentDayWeatherArray[0] = `${cityName} ${dayjs.unix(currentWeather.dt).format('MMM D, YYYY h:mm A')}  `;
        //currentDayWeatherArray[1] = `<i class="fas ${getWeatherIconClass(currentWeather.weather[0].icon)}"></i>`;
        currentDayWeatherArray[1] = `Temp: ${currentWeather.temp}°F` // temp in fahrenheit       
        currentDayWeatherArray[2] = `Wind: ${currentWeather.wind_speed} MPH`;  // wind speed in miles per hour
        currentDayWeatherArray[3] = `Humidity: ${currentWeather.humidity} %`;   // relative humidity   

        // Write the current weather data to the page
        const childElements = $('#selectedCityTodayForecast').children();
        currentDayWeatherArray.forEach((value, index) => {
            childElements.eq(index).text(value);
        })
        console.log(`the weather icon code is (line 139): ${currentWeather.weather[0].icon}`);

        var icon = currentWeather.weather[0].icon

        // call function to display the icon

        displayCurrentWeatherIcon(icon)

        displayFiveDay(data);
    }

    function displayFiveDay(data) {
        let fiveDayWeather;
        fiveDayWeather = data.daily;
        console.log(`the data.daily object is (line 153)`, JSON.stringify(data.daily, null, 2));
        const iconCodes = []; // Initialize the iconCodes array outside the loop
        for (let i = 0; i < data.daily.length - 1; i++) {
            const weather5DayIconParent = $(`.5dayForecastDay${i+1}`);
            fiveDayWeather = data.daily[i + 1]; // get day i +1
            iconCodes[i] = fiveDayWeather.weather[0].icon;
            console.log(`the fiveDayWeather.icon is (line 158): ${fiveDayWeather.weather[0].icon})`)
            console.log(`the iconCodes array (line 159) ${i}th element is ${iconCodes[i]}`)

            //assign and format weather data to the currentDayWeatherArray for display
            fiveDayWeatherArray[0] = dayjs.unix(fiveDayWeather.dt).format('M/D/YYYY');
            fiveDayWeatherArray[1] = `Temp: ${fiveDayWeather.temp.day}°F`; // temp in fahrenheit       
            fiveDayWeatherArray[2] = `Wind: ${fiveDayWeather.wind_speed} MPH`;  // wind speed in miles per hour
            fiveDayWeatherArray[3] = `Humidity: ${fiveDayWeather.humidity} %`;   // relative humidity   

            // Write the five day weather data to the page
            // Select <p> and <h4> elements within the container
            const childElements = weather5DayIconParent.find('h4, p');
            fiveDayWeatherArray.forEach((value, index) => {
                childElements.eq(index).text(value);
            })
        };
        // call the icon display function
        display5dayWeatherIcons(iconCodes);
    }

    function displayCurrentWeatherIcon(iconCode) {
        const weatherIconParentEl = $('#todayCity');

        // Remove any existing SVG elements
        weatherIconParentEl.find('svg').remove();

        // Remove any existing <i> elements (commented out or not)
        weatherIconParentEl.find('i').remove();
        console.log(`icon code is (line 185): ${iconCode}`);
        if (iconMap.hasOwnProperty(iconCode)) {
            const iconClass = iconMap[iconCode];
            console.log(`iconclass is (line 188:) ${iconClass}`);

            // Create a new <i> element with the appropriate class
            const newIconElement = $('<i>', {
                id: 'weather-icon',
                class: `fas ${iconClass}`
            });

            // Append the new <i> element to the parent
            weatherIconParentEl.append(newIconElement);
        } else {
            // Default icon if the icon code is not recognized
            const defaultIconElement = $('<i>', {
                id: 'weather-icon',
                class: 'fas fa-question-circle'
            });

            // Append the default <i> element to the parent
            weatherIconParentEl.append(defaultIconElement);
        }

    }

    function display5dayWeatherIcons(iconCodes) {
        // Loop through the five forecast days
        for (let i = 1; i <= 5; i++) {
            console.log(`this is iconCodes (line 214): ${iconCodes}`)
            const cardSelector = `.5dayForecastDay${i}`;
            const weather5DayIconParent = $(cardSelector);

            // Remove any existing SVG elements
            weather5DayIconParent.find('svg').remove();

            // Remove any existing <i> elements (commented out or not)
            weather5DayIconParent.find('i').remove();

            const iconCode = iconCodes[i - 1]; // Assuming iconCodes is an array of icon codes
            console.log(`this is the iconCode set on line 225: ${iconCode}`);
            if (iconMap.hasOwnProperty(iconCode)) {
                const iconClass = iconMap[iconCode];

                // Create a new icon element with the appropriate class
                const newIconElement = $('<i>', {
                    id: 'weather-icon',
                    class: `fas ${iconClass}`
                });

                // Append the new icon element immediately after the h4 element
                const h4Element = weather5DayIconParent.find('h4');
                h4Element.after(newIconElement);
            } else {
                // Default icon if the icon code is not recognized
                const defaultIconElement = $('<i>', {
                    id: 'weather-icon',
                    class: 'fas fa-question-circle'
                });

                // Append the default icon element immediately after the h4 element
                const h4Element = weather5DayIconParent.find('h4');
                h4Element.after(defaultIconElement);
            }
        }
    }
})

