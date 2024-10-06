// TODO Fix this file - its a mess
import axios from "axios";
import { updateTemp, updateDescription } from "../actions";

export default function weatherApi(setLat, setLong, setData, dispatch) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLat = position.coords.latitude;
        const currentLong = position.coords.longitude;
        setLat(currentLat);
        setLong(currentLong);

        if (!currentLat || !currentLong) {
          reject(new Error("Latitude or longitude is undefined"));
          return;
        }

        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${currentLat}&lon=${currentLong}&exclude={part}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          );
          setData(res.data);
          dispatch(updateTemp(Math.floor(res.data.current.temp)));
          dispatch(updateDescription(res.data.current.weather[0].description));
          resolve(res.data);
        } catch (error) {
          console.error("Error calling weather API:", error);
          reject(error);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        reject(error);
      }
    );
  });
}
