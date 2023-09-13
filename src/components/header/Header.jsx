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
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const newDate = month + "/" + day + "/" + year;

  dispatch(updateDate(newDate));

  return (
    data && (
      <header className="App-header">
        <SignForm sign={sign} setSign={setSign} data={data} time={time}/>
        <p> {newDate} </p>
        <div className="Forecast">
          {data.current ? <Weather data={data} time={time}/> : <div></div>}
        </div>
      </header>
    )
  );
}
