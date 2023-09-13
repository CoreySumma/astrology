import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import React from "react";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance";
import weatherApi from "../../utilities/weather-api";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [sign, setSign] = useState([]);

  // const date = new Date(); // This will give you the current date and time

  const dispatch = useDispatch();

  useEffect(() => {
    weatherApi(lat, long, setLat, setLong, setData, dispatch);
  }, [lat, long]);

  // Redux for retrieving data from the store for state
  let description = useSelector((state) => state.userData.description);
  let temp = useSelector((state) => state.userData.temp);
  let date = useSelector((state) => state.userData.date);
  let time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    // console.log("this is right before passing to header component", data),
    <div className="App">
      <img src="../../images/zodiac.png" className="spin" alt="" />
      <Header data={data} time={time} sign={sign} setSign={setSign} />
      <main>
        <DayAtAGlance
          data={data}
          temp={temp}
          date={date}
          time={time}
          description={description}
          sign={sign}
        />
      </main>
    </div>
  );
}
