import React from "react";
import Weather from "../Weather/Weather";
import SignForm from "../SignForm/SignForm";

export default function Header({ data }) {
  // set current date
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const newdate = month + "/" + day + "/" + year;
  return (
    <header className="App-header">
      <SignForm />
      <p> {newdate} </p>
      <div className="Forecast">
        {typeof data.main != "undefined" ? (
          <Weather data={data} />
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
}
