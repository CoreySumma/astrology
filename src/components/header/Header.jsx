import React from "react";
import Weather from "../Weather/Weather";
import SignForm from "../SignForm/SignForm";

export default function Header({ data, time, sign, setSign }) {
  // console.log("this is within the header component", data);
  // set current date
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const newdate = month + "/" + day + "/" + year;
  return (
    data && (
      <header className="App-header">
        <SignForm sign={sign} setSign={setSign} data={data} time={time}/>
        <p> {newdate} </p>
        <div className="Forecast">
          {data.current ? <Weather data={data} time={time}/> : <div></div>}
        </div>
      </header>
    )
  );
}
