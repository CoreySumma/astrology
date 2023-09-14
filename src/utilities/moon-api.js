import axios from "axios";

export default async function moonApi(setMoonData) {
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
          latitude: 6.56774,
          longitude: 79.88956,
          date: "2023-11-01",
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
    console.log(response.data.data.imageUrl);
    return response.data;
  } catch (error) {
    console.error("Error calling moon API:", error);
  }
}
