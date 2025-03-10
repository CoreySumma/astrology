import axios from "axios";
import {
  updateBusinessName,
  updateBusinessLocation,
} from "../redux/actions/actions";

export default async function yelpAPI(search, lat, long, dispatch) {
  try {
    const url = `https://api.yelp.com/v3/businesses/search?term=${search}&latitude=${lat}&longitude=${long}`;
    const response = await axios.get(`https://proxy.cors.sh/${url}`, {
      headers: {
        "x-cors-api-key": process.env.REACT_APP_CORS_API_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(updateBusinessName(response.data.businesses[0].name));
    dispatch(
      updateBusinessLocation(
        response.data.businesses[0].location.display_address.join(", ")
      )
    );
  } catch (error) {
    throw new Error(`Error calling Yelp API: ${error.message}`);
  }
}
