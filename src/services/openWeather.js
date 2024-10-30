import axios from "axios";
import { updateTemp, updateDescription } from "../redux/actions/actions";

export default function weatherApi(setLat, setLong, dispatch) {
  return new Promise((_, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLat = position.coords.latitude;
        const currentLong = position.coords.longitude;

        if (!currentLat || !currentLong) {
          reject(new Error("Could not get latitude and longitude"));
          return;
        }

        setLat(currentLat);
        setLong(currentLong);

        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${currentLat}&lon=${currentLong}&exclude={part}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          );
          dispatch(updateTemp(Math.floor(res.data.current.temp)));
          dispatch(updateDescription(res.data.current.weather[0].description));
        } catch (error) {
          reject(new Error(`Error calling OpenWeather API: ${error.message}`));
        }
      },
      (error) => {
        reject(new Error(`Error calling OpenWeather API: ${error.message}`));
      }
    );
  });
}
