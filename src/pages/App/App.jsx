import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import React from "react";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance";
import weatherApi from "../../utilities/weather-api";
import { updateTime } from "../../actions";
import axios from "axios";

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState([]);
  const [sign, setSign] = useState([]);

  const dispatch = useDispatch();
  // Call the openWeather API to get forecast and pass long and lat for reverse geo
  useEffect(() => {
    weatherApi(lat, long, setLat, setLong, setData, dispatch);
    // Call the google maps API to get the city name
    if (long && lat) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
          );
          console.log(
            "response from google api--->",
            res.data.results[0].address_components[2].long_name,
            res.data.results[0].address_components[3].long_name,
            res.data.results[0].address_components[5].long_name
          );
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
  }, [lat, long, dispatch]);

  // Redux for retrieving data from the store for state
  let description = useSelector((state) => state.userData.description);
  let temp = useSelector((state) => state.userData.temp);
  let date = useSelector((state) => state.userData.date);
  let time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  dispatch(updateTime(time));

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
        />
      </main>
    </div>
  );
}
