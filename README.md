<div id="description" align="center">

# AI Horoscope


![astronomy](https://github.com/CoreySumma/astrology/assets/66542022/99aa273a-3a59-4bdf-938a-0158a0883764)



## Description:
This is a React application that utilizes Open AI's API, Open Weathers API, Astronomy API(show current moon phase based on location and date), Yelp Fusion API and Google's reverse geolocation API to generate a specific horoscope for the day for the user based on Date, Time, Astrological Sign, Weather, Temperature, Day of the Week, closest Yoga center, and the User's Location.

</div>

## Trying the the App

- Make sure location services is enabled.

- Select your Star Sign.

- Click the "Ask The Universe" Button.

- Read the output and take on the day!

<div align='center'>

 ## [Click here to get a reading!](https://mydailyprediction.netlify.app/)
  
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

</div>

## Want to fork it? Here's how to get started:
<div id="steps-to-fork" align="left">

1. Clone this repo in the desired directory (currently the prod branch is the most up to date).   
2. Run pnpm install to install all the dependencies.  
3. Create a .env file in the root directory and add the following:  

- REACT_APP_OPEN_AI_KEY 
- REACT_APP_WEATHER_API_KEY
- REACT_APP_GOOGLE_API_KEY
- REACT_APP_YELP_API_KEY
- REACT_APP_YELP_API_ID
- REACT_APP_CORS_API_KEY

Resources for getting the API keys: (Note: All of these or free or available for a free trial.)
- Open AI: https://community.openai.com/t/how-do-i-get-my-api-key/29343
- Open Weather: https://openweathermap.org/api
- Google: https://developers.google.com/maps/documentation/geolocation/get-api-key
- Yelp: https://docs.developer.yelp.com/docs/fusion-intro
- Cors: https://cors.sh/ (we need this to avoid making a backend)

4. Run pnpm start to start the development server.

This application also has Github actions set up for CI/CD. The actions are set up to run the tests on push & pull requests. Disable them at will in the .github/workflows folder. Or, add all of your API keys to the secrets in the settings of your repo and the actions should run successfully.

</div>
