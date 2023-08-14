export default function Weather({ data, time }) {
  console.log("this is the log of data in weather", data)
  return (
    data && 
    <>
      <div className="Forecast">
      <p>{data.current.temp}</p>
      <p>{time}</p>
      </div>
    </>
  );
}

