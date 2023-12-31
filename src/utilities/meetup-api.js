import axios from 'axios';
import { updateBusinessName, updateBusinessLocation } from "../actions";

export default async function getMeetUp(search, lat, long, dispatch) {
  try {
    // Adding prefix URL to send CORS header to Yelp API (we are cheating not having a backend)
    const response = await axios.get(`https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?term=${search}&latitude=${lat}&longitude=${long}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        "Content-Type": "application/json",
      }
    });
    console.log("Yelp API response", response);
    const businessName = response.data.businesses[0].name;
    const businessImage = response.data.businesses[0].image_url;
    const businessUrl = response.data.businesses[0].url;
    const businessLocation = response.data.businesses[0].location.display_address.join(", ");
    dispatch(updateBusinessName(businessName));
    dispatch(updateBusinessLocation(businessLocation));
    return response.data; 
  } catch (error) {
    console.error("Error calling Yelp API", error);
  }
}
