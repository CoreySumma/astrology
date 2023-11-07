import React, { useEffect } from "react";
import Weather from "../Weather/Weather";
import SignForm from "../SignForm/SignForm";
import "./Header.css";

export default function Header({
  data,
  time,
  sign,
  setSign,
  fade,
  setFade,
}) {

  return (
    data && (
      <header className="App-header">
        <SignForm
          sign={sign}
          setSign={setSign}
          data={data}
          time={time}
          fade={fade}
          setFade={setFade}
        />
        {/* <p className="date-display"> {newDate} </p> */}
        {/* <div className="Forecast">
          {data.current ? <Weather data={data} time={time}/> : <div></div>}
        </div> */}
      </header>
    )
  );
}
