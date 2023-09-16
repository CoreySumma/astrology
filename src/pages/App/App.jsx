import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance.jsx";
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

  useEffect(() => {
    // Get the date for GPT
    const dateObj = new Date();
    const newDate = dateObj.toLocaleDateString();
    let time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    // Get the day of the week for GPT
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    // Convert Date for what moon API accepts
    let month = dateObj.getMonth() + 1; // getMonth() returns months from 0-11, so add 1 to get the correct month
    month = month < 10 ? "0" + month : month; // add leading zero if month is single digit
    let day = dateObj.getDate();
    day = day < 10 ? "0" + day : day; // add leading zero if day is single digit
    const moonDate = `${dateObj.getFullYear()}-${month}-${day}`;
    // Save to redux store
    dispatch(updateDay(dayOfWeek));
    dispatch(updateDate(newDate));
    dispatch(updateTime(time));
    // Call the weather API with arguments
    weatherApi(lat, long, setLat, setLong, setData, dispatch);
    // Call the moon API with arguments to get moon phase image and display it with local state
    moonApi(setMoonData, lat, long, moonDate);
    // Call the google maps API to get the city name, state etc
    if (long && lat) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
          );
          // Delete me
          console.log("this is the res from google", res.data);
          // General location from google
          const locationData = `
          ${res.data.results[0].address_components[2].long_name},
          ${res.data.results[0].address_components[3].long_name}, 
          ${res.data.results[0].address_components[5].long_name}`.trim();

          // Exact location from google (gpt seems to work better with the general location)
          // const locationData = `${res.data.results[0].formatted_address}`.trim();

          // Save location to redux store
          dispatch(updateLocation(locationData));
          // Set flag to true to avoid constant calling of API
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

  // Redux for retrieving data from the store for state to pass to components/GPT
  let description = useSelector((state) => state.userData.description);
  let temp = useSelector((state) => state.userData.temp);
  let date = useSelector((state) => state.userData.date);
  let time = useSelector((state) => state.userData.time);
  let location = useSelector((state) => state.userData.location);
  let day = useSelector((state) => state.userData.day);

  return (
    <div className="App">
      <img className="astroLogo" src="../../images/zodiac.png" alt="" />
      <Header data={data} time={time} sign={sign} setSign={setSign} />
      <main>
        <DayAtAGlance
          temp={temp}
          date={date}
          time={time}
          description={description}
          sign={sign}
          location={location}
          day={day}
          moonData={moonData}
        />
      </main>
    </div>
  );
}
