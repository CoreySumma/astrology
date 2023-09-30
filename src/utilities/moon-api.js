import axios from "axios";

export default async function moonApi(setMoonData, lat, long, moonDate) {
  const authString = btoa(
    `${process.env.REACT_APP_MOON_APP_ID}:${process.env.REACT_APP_MOON_API_KEY}`
  );
  try {
    const response = await axios.post(
      "https://api.astronomyapi.com/api/v2/studio/moon-phase",
      {
        format: "png",
        style: {
          moonStyle: "shaded",
          backgroundStyle: "solid",
          backgroundColor: "transparent",
          headingColor: "transparent",
          textColor: "transparent",
        },
        observer: {
          latitude: parseFloat(`${lat}`),
          longitude: parseFloat(`${long}`),
          // Check out different images of moon phases by changing the date manually below
          // date: "2023-09-18",
          date: `${moonDate}`,
        },
        view: {
          type: "portrait-simple",
        },
      },
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/json",
        },
      }
    );
    setMoonData(response.data.data.imageUrl);
    return response.data;
  } catch (error) {
    console.error("Error calling moon API:", error);
  }
}
