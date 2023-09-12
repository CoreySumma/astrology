import "./App.css";
import Header from "../../components/Header/Header";
import React from "react";
import { useEffect, useState } from "react";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [sign, setSign] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  const [location, setLocation] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const date = new Date(); // This will give you the current date and time
  const time = new Date().toLocaleTimeString('en-US',
   { hour: '2-digit', 
   minute: '2-digit', 
   hour12: true 
  });

  useEffect(() => {
    // This will get the user's current location and set the latitude and longitude states
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLat = position.coords.latitude;
        const currentLong = position.coords.longitude;
        // console.log(currentLat, currentLong);
        setLat(currentLat);
        setLong(currentLong);
        // get the users actual location using the latitude and longitude states
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    // This will fetch the weather data from the API using the latitude and longitude states
    if (lat.length !== 0 && long.length !== 0) {
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          console.log(res);
        });
    }
  }, [lat, long]);

  return (
    // console.log("this is right before passing to header component", data),
    <div className="App">
      <img src="../../images/zodiac.png" className="spin" alt="" />
      <Header data={data} time={time} sign={sign} setSign={setSign}/>
      <main>
        <DayAtAGlance />
      </main>
    </div>
  );
}
