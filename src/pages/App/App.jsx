import "./App.css";
import Header from "../../components/Header/Header";
import React from "react";
import { useEffect, useState } from "react";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const date = new Date(); // This will give you the current date and time
  const time = Math.floor(date.getTime() / 1000); // This will give you the current time in seconds for our weather API call in the format it accepts

  useEffect(() => {
    // This will get the user's current location and set the latitude and longitude states
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLat = position.coords.latitude;
        const currentLong = position.coords.longitude;
        console.log(currentLat, currentLong);
        setLat(currentLat);
        setLong(currentLong);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    // This will fetch the weather data from the API using the latitude and longitude states
    if (lat.length !== 0 && long.length !== 0) {
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          console.log(res);
        });
    }
  }, [lat, long]);

  return (
    console.log("this is right before passing to component", data),
    <div className="App">
      <img src="../../images/zodiac.png" className="spin" alt="" />
      <Header data={data} />
      <main>
        <div className="prediction-container">
          <p className="prediction-text">
            Please select your sign to see your prediction for today.
          </p>
        </div>
      </main>
    </div>
  );
}
