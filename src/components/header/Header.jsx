import React, { useEffect } from "react";
import Weather from "../Weather/Weather";
import SignForm from "../SignForm/SignForm";
import "./Header.css";
import { updateDate } from "../../actions";
import { useDispatch } from "react-redux";

export default function Header({
  data,
  time,
  sign,
  setSign,
  fade,
  setFade,
}) {
  // console.log("this is within the header component", data);
  // set current date
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const dateObj = new Date();
  //   const newDate = dateObj.toLocaleDateString();
  //   dispatch(updateDate(newDate));
  // }, [dispatch]);

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
