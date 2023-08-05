import "./App.css";
import Header from "../../components/Header/Header";
import React from "react";

export default function App() {
  return (
    <div className="App">
      <img src="../../images/zodiac.png" className="spin" alt="" />
      <Header />
      <main>
        <div className="prediction-container">
          <p className="prediction-text">
            Please select your sign to see your prediction for today.
          </p>
        </div>
      </main>
    </div>
  );
}
