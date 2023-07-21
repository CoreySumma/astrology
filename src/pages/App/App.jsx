import "./App.css";
import Header from "../../components/Header/Header";

export default function App() {
  return (
    <div className="App">
      <img src="../../images/zodiac.png" alt="" />
      <Header />
      <main>
        <div className="prediction-container">
          <p className="prediction-text">
            This will be where you see your Astrological prediction for the day.
          </p>
        </div>
      </main>
    </div>
  );
}
