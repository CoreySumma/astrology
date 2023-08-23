// This file is not being used yet but will be used to fetch the weather data from the API if needed


export function weatherApi() {
  useEffect(() => {
    // This will get the user's current location and set the latitude and longitude states
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLat = position.coords.latitude;
        const currentLong = position.coords.longitude;
        console.log(currentLat, currentLong);
        setLat(currentLat);
        setLong(currentLong);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    // This will fetch the weather data from the API using the latitude and longitude states
    if (lat.length !== 0 && long.length !== 0) {
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          console.log(res);
        });
    }
  }, [lat, long]);
}