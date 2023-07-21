import React from "react";
import Weather from "../Weather/Weather";

export default function Header() {
  return (
    <header className="App-header">
      <div className="Forecast">
        <Weather />
      </div>
    </header>
  );
}
