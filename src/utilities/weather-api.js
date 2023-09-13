import axios from "axios";
import { updateTemp, updateDescription} from "../actions";

export default async function weatherApi(
  lat,
  long,
  setLat,
  setLong,
  setData,
  dispatch,
) {
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
          dispatch(updateTemp(res.data.current.temp));
          dispatch(updateDescription(res.data.current.weather[0].description));
          return res.data;
        } catch (error) {
          console.error("Error calling weather API:", error);
        }
      }
    });
  };
  fetchData();
}
