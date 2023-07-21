import React from "react";
import Weather from "../Weather/Weather";
import SignForm from "../SignForm/SignForm";

export default function Header() {
  return (
    <header className="App-header">
      <SignForm />
      <div className="Forecast">
        <Weather />
      </div>
    </header>
  );
}
