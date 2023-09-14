import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import React from "react";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance";
import weatherApi from "../../utilities/weather-api";
import moonApi from "../../utilities/moon-api";
import { updateTime } from "../../actions";
import { updateLocation } from "../../actions";
import { updateDate } from "../../actions";
import { updateDay } from "../../actions";
import axios from "axios";

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  // "Data" is actually openWeather api data
  const [data, setData] = useState([]);
  const [moonData, setMoonData] = useState(null);
  const [sign, setSign] = useState([]);
  // Flag to check if location has been fetched to avoid constant calling of API
  let [locationFetched, setLocationFetched] = useState(false);

  const dispatch = useDispatch();
  // Call the openWeather API to get forecast and pass long and lat for reverse geo
  useEffect(() => {
    weatherApi(lat, long, setLat, setLong, setData, dispatch);
    // Call the moon API to get moon phase image and display it with local state 
    moonApi(setMoonData);
    // Call the google maps API to get the city name
    if (long && lat) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
          );
          // Delete me
          console.log(
            "response from google api--->",
            res.data.results[0].address_components[2].long_name,
            res.data.results[0].address_components[3].long_name,
            res.data.results[0].address_components[5].long_name
          );
          const locationData = `
          ${res.data.results[0].address_components[2].long_name},
          ${res.data.results[0].address_components[3].long_name}, 
          ${res.data.results[0].address_components[5].long_name}`.trim();
          let time = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          const dateObj = new Date();
          const newDate = dateObj.toLocaleDateString();
          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const dayOfWeek = daysOfWeek[dateObj.getDay()];
          dispatch(updateDay(dayOfWeek));
          dispatch(updateDate(newDate));
          dispatch(updateTime(time));
          dispatch(updateLocation(locationData));
          setLocationFetched(true);
          return `
          ${res.data.results[0].address_components[2].long_name},
          ${res.data.results[0].address_components[3].long_name}, 
          ${res.data.results[0].address_components[5].long_name}`;
        } catch (error) {
          console.log("Error making geo call", error);
        }
      };
      fetchData();
    }
  }, [lat, long, dispatch, locationFetched]);

  // Redux for retrieving data from the store for state
  let description = useSelector((state) => state.userData.description);
  let temp = useSelector((state) => state.userData.temp);
  let date = useSelector((state) => state.userData.date);
  let time = useSelector((state) => state.userData.time);
  let location = useSelector((state) => state.userData.location);
  let day = useSelector((state) => state.userData.day);

  return (
    <div className="App">
      <img src="../../images/zodiac.png" className="" alt="" />
      <Header data={data} time={time} sign={sign} setSign={setSign} />
      <main>
        <DayAtAGlance
          data={data}
          temp={temp}
          date={date}
          time={time}
          description={description}
          sign={sign}
          location={location}
          day={day}
          moonData= {moonData}
          />
      </main>
    </div>
  );
}
