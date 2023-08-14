
export default function Weather({ data }) {

  return (
    console.log(data),
    <>
      <div className="Forecast">
        <p>City Name: {data.name}</p>
        <p>Temprature: {data.main.temp} &deg;</p>
        <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Description: {data.weather[0].main}</p>
        <p>This is where the weather for the day is going to go.</p>
      </div>
    </>
  );
}
