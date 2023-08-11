# 06 Server-Side APIs: Weather Dashboard

#### Coder: Tom Fusco 10-Aug-2023
#### 06 Server-Side APIs: Weather Dashboard

<img src="assets/mockup/06-server-side-apis-homework-demo.png" width=50%>

#### Link to Deployed Application:  https://smokerdog57.github.io/weatherdashboard/
#### Link to GitHub repository:     https://github.com/smokerdog57/weatherdashboard/

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Application Requirements 
``
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

``
## Design Description

This application performs fetchs to the open weather api to get city geo data and weather data.

The current day and 5 day forecast are displayed.

Whenever a city name is typed in it is added as a button for future action.

Buttons are stored in local storage and retrieved when screen is refreshed.

## Mock-Up

The following animation demonstrates the application functionality:

<img src="assets/mockup/06-server-side-apis-homework-demo.png" width=75%>

## Build, Installation and Deployment

 * Application built using MS Visual Studio.
 * Application was commited and pushed to GitHub repository "codequiz" main branch.
 * Used GitHub "pages" to deploy application.

## Quality

* Application resembles mock-up.
* Repository has a unique name.
* Repository follows best practices for file structure and naming conventions.
* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
* Repository contains multiple descriptive commit messages.
* Repository contains quality README file with description, screenshot, and link to deployed application.

## Technologies used

 * HTML
 * CSS
 * Javascript
 * Web Api(s)
    - jQuery
    - dayjs
    - bootstrap
 * Server-side Api(s)

## Credits

 * Tutoring session with Sandy
 * Consultation with my peer students
 * Slack resource channel

## License

© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.