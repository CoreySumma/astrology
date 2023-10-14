import axios from "axios";
import { updateLocation } from "../actions";

export default async function getLocationFromGoogs(
  lat,
  long,
  dispatch,
  setLocationFetched,
) {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    // General location from the googs

    // const locationData = `
    // ${res.data.results[0].address_components[2].long_name},
    // ${res.data.results[0].address_components[3].long_name},
    // ${res.data.results[0].address_components[5].long_name}`.trim();

    console.log(res)
    
    const locationData = `
    ${res.data.results[0].address_components[3].long_name}, 
    ${res.data.results[0].address_components[5].long_name}`.trim();

    // Exact location from the googs (gpt seems to work better with the general location)
    // const locationData = `${res.data.results[0].formatted_address}`.trim();

    // Save location to redux store
    dispatch(updateLocation(locationData));
    // Set flag to true to avoid constant calling of API and for Modal display
    setLocationFetched(true);
    return `
    ${res.data.results[0].address_components[2].long_name},
    ${res.data.results[0].address_components[3].long_name}, 
    ${res.data.results[0].address_components[5].long_name}`;
  } catch (error) {
    console.log("Error making reverse geo call - cant find you!", error);
  }
}
