// This file is not being used yet but will be used to fetch the weather data from the API if needed
import { current } from "@reduxjs/toolkit";
import axios from "axios";

export default async function weatherApi(lat, long, setLat, setLong, setData) {
  // This will get the user's current location and set the latitude and longitude states
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const currentLat = position.coords.latitude;
      const currentLong = position.coords.longitude;
      console.log(currentLat, currentLong);
      setLat(currentLat);
      setLong(currentLong);
      // This will fetch the weather data from the API using the latitude and longitude states
      if (currentLat && currentLong) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          );
          setData(res.data);
          console.log(res.data);
          return res.data;
        } catch (error) {
          console.error("Error calling weather API:", error);
        }
      }
    });
  };
  fetchData();
}
