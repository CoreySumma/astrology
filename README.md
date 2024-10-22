<div id="description" align="center">

# AI Horoscope


![astronomy](https://github.com/CoreySumma/astrology/assets/66542022/99aa273a-3a59-4bdf-938a-0158a0883764)



## Description:
This is a React application that utilizes Open AI's API, Open Weathers API, Yelp Fusion API and Google's reverse geolocation API to generate a specific horoscope for the day for the user based on Date, Time, Astrological Sign, Weather, Temperature, Day of the Week, closest Yoga center, and the User's Location.

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

Resources for getting the API keys: (Note: All of these are free or available for a free trial.)
- Open AI: https://community.openai.com/t/how-do-i-get-my-api-key/29343
- Open Weather: https://openweathermap.org/api
- Google: https://developers.google.com/maps/documentation/geolocation/get-api-key
- Yelp: https://docs.developer.yelp.com/docs/fusion-intro
- Cors: https://cors.sh/ (we need this to avoid making a backend)

4. Run pnpm start to start the development server.

## CI/CD with GitHub Actions

This application includes **GitHub Actions** to automate **CI/CD workflows**. The actions are triggered on **push** and **pull requests** to the main branches. You can **disable or customize** these workflows in the `.github/workflows/` folder as needed.  

Make sure to **add your API keys and secrets** in **Settings > Secrets and Variables > Actions** to ensure that all workflows run smoothly. The workflows currently include:

- **Linting**: Ensures consistent code style.
- **e2e tests**: Uses Playwright for end-to-end testing.
- **SonarCloud Code Analysis**: Runs static analysis to assess code quality and detect security issues.

  **Full Instructions** https://github.com/SonarSource/sonarcloud-github-action

---

### Using SonarCloud for Code Analysis

1. **Set up SonarCloud:**
   - Create an account on [SonarCloud](https://sonarcloud.io/).
   - Link your GitHub repository and create a SonarCloud project.

2. **Generate a SonarCloud Token:**
   - Go to **My Account > Security > Tokens** in SonarCloud.
   - Generate a new token and **copy** it (you won’t see it again).

3. **Add the Token to GitHub Secrets:**
   - Go to **Settings > Secrets and Variables > Actions** in your GitHub repository.
   - Add a **new secret** named `SONAR_TOKEN` with the value of the token you copied.

4. **Update the YAML Workflow:**
   - Modify the YAML workflow to include your **SonarCloud project key** and **organization**.

OR

Delete this block in the YAML file:

<code>
 SonarCloud_Analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Code Scan
        uses: sonarsource/sonarcloud-github-action@v2
        with:
          args: >
            -Dsonar.projectKey=CoreySumma_astrology
            -Dsonar.organization=coreysumma
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
</code>

</div>
