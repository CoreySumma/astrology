// We aren't using this file yet, but we might in the future.
import axios from 'axios';
import { updateBusinessName, updateBusinessLocation } from "../actions";

export default async function getMeetUp(search, lat="37.786882", long="-122.399972", dispatch) {
  try {
    console.log(lat, long)
    // Adding prefix to send CORS header to Yelp API (we are cheating not having a backend)
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&latitude=${lat}&longitude=${long}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        "Content-Type": "application/json",
      }
    });
    const businessName = response.data.businesses[0].name;
    const businessImage = response.data.businesses[0].image_url;
    const businessUrl = response.data.businesses[0].url;
    const businessLocation = response.data.businesses[0].location.display_address.join(", ");
    console.log(response);
    dispatch(updateBusinessName(businessName));
    dispatch(updateBusinessLocation(businessLocation));
    return response.data; 
  } catch (error) {
    console.error("Error calling Yelp API", error);
  }
}
