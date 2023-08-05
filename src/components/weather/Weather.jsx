export default function Weather() {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const newdate =  + month + "/" + day + "/" + year ;
  return (
    <>
      <div className="Forecast">
        <h2>Weather</h2>
        <p>{newdate}</p>
        <p>This is where the weather for the day is going to go.</p>
      </div>
    </>
  );
}
