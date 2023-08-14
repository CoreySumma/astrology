export default function Weather({ data }) {
  console.log("this is the log of data in weather", data)
  return (
    data && 
    <>
      <div className="Forecast">
      <p>{data.current.temp}</p>
      </div>
    </>
  );
}

