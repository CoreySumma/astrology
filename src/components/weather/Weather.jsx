// We don't use this component anymore, but we keep it for reference
// If we want to display the weather - we can use this 

export default function Weather({ data, time }) {
  // console.log("this is the log of data in weather", data)
  return (
    data && 
    <>
      <div className="Forecast">
      <p>{data.current.temp}</p>
      <p>{time}</p>
      <p>{data.current.weather[0].description}</p>
      <p>{data.alerts  ? data.alerts[0].sender_name : null}</p>
      <p>{data.alerts ? data.alerts[0].event : null}</p>
      </div>
    </>
  );
}

