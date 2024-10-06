import axios from "axios";
import { updateBusinessName, updateBusinessLocation } from "../actions";

// eslint-disable-next-line consistent-return
export default async function getMeetUp(search, lat, long, dispatch) {
  try {
    const url = `https://api.yelp.com/v3/businesses/search?term=${search}&latitude=${lat}&longitude=${long}`;
    // const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://api.yelp.com/v3/businesses/search?term=${search}&latitude=${lat}&longitude=${long}`);
    // Make the request using cors.sh proxy
    const response = await axios.get(`https://proxy.cors.sh/${url}`, {
      // const response = await axios.get(`${url}`, {
      headers: {
        // 'x-cors-api-key': process.env.REACT_APP_CORS_API_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const businessName = response.data.businesses[0].name;
    // const businessImage = response.data.businesses[0].image_url;
    // const businessUrl = response.data.businesses[0].url;
    const businessLocation =
      response.data.businesses[0].location.display_address.join(", ");

    dispatch(updateBusinessName(businessName));
    dispatch(updateBusinessLocation(businessLocation));

    return response.data;
  } catch (error) {
    console.error("Error calling Yelp API", error);
  }
}
