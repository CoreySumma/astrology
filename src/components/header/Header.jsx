import React from "react";
import Weather from "../Weather/Weather";
import SignForm from "../SignForm/SignForm";
import "./Header.css";
import { updateDate } from "../../actions";
import { useDispatch } from "react-redux";

export default function Header({ data, time, sign, setSign }) {
  // console.log("this is within the header component", data);
  // set current date
  const dispatch = useDispatch();
  let dateObj = new Date();
  let month = dateObj.getMonth() + 1; // Months from 1-12
  let day = dateObj.getDate();  // Gets the day of the month according to local time
  let year = dateObj.getFullYear();

  const newDate = month + "/" + day + "/" + year;

  dispatch(updateDate(newDate));

  return (
    data && (
      <header className="App-header">
        <SignForm sign={sign} setSign={setSign} data={data} time={time}/>
        <p className="date-display"> {newDate} </p>
        {/* <div className="Forecast">
          {data.current ? <Weather data={data} time={time}/> : <div></div>}
        </div> */}
      </header>
    )
  );
}
