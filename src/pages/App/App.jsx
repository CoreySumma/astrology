import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import React from "react";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance";
import weatherApi  from "../../utilities/weather-api";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [sign, setSign] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  const [location, setLocation] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const date = new Date(); // This will give you the current date and time
  const time = new Date().toLocaleTimeString('en-US',
   { hour: '2-digit', 
   minute: '2-digit', 
   hour12: true 
  });

  const dispatch = useDispatch();

  useEffect(() => {
    weatherApi(lat, long, setLat, setLong, setData, dispatch)
  }, [lat, long]);

  return (
    // console.log("this is right before passing to header component", data),
    <div className="App">
      <img src="../../images/zodiac.png" className="spin" alt="" />
      <Header data={data} time={time} sign={sign} setSign={setSign}/>
      <main>
        <DayAtAGlance data={data} time={time} sign={sign} setSign={setSign}/>
      </main>
    </div>
  );
}
