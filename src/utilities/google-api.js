import axios from "axios";
import { updateLocation } from "../actions";

export default async function getLocationFromGoogs(
  lat,
  long,
  dispatch,
  setLocationFetched
) {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );

    dispatch(
      updateLocation(
        `
    ${res.data.results[0].address_components[3].long_name}, 
    ${res.data.results[0].address_components[5].long_name}`.trim()
      )
    );
    setLocationFetched(true);
  } catch (error) {
    console.log("Error making reverse geo call - cant find you!", error);
  }
}
