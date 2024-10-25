import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "./App.css";
import { useDispatch } from "react-redux";
import Prediction from "../../components/Prediction/Prediction";
import Modal from "../../components/Modal/Modal";
import getLocationFromGoogs from "../../utilities/google-api";
import weatherApi from "../../utilities/weather-api";
import yelpApi from "../../utilities/yelp-api";
import { awsCheckIfVisited } from "../../utilities/aws-database-api";
import ZodiacSwiper from "../../components/ZodiacSwiper/ZodiacSwiper";
import { updateDate, updateTime, updateDay } from "../../redux/actions/actions";

dayjs.extend(localeData);

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const [fade, setFade] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  
  // Search term for whatever business you want to show up in the prediction
  // Currently set to yoga but could be set to "coffee", "restaurant", or "museum" etc
  const search = "yoga";
  
  // On mount get the user's latitude, longitude, day, time, date and weather
  // (lat and long is baked into the weather API call)
  useEffect(() => {
    dispatch(updateDate(dayjs().format("MM/DD/YYYY"))); // current date
    dispatch(updateTime(dayjs().format("hh:mm A"))); // current time
    dispatch(updateDay(dayjs().format("dddd"))); // current day
    weatherApi(setLat, setLong, dispatch);
  }, []);

  // Fire off the Google Maps and Yelp API calls when the user's location is fetched
  const isLongAndLatSet = long && lat;
  useEffect(() => {
    if (isLongAndLatSet) {
      getLocationFromGoogs(lat, long, dispatch, setLocationFetched);
      yelpApi(search, lat, long, dispatch);
    }
  }, [isLongAndLatSet]);

  // Grace period of 4 seconds before the modal shows after the location is fetched
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(!locationFetched);
    }, 4000);
    if (locationFetched) {
      awsCheckIfVisited(dayjs().format("MM/DD/YYYY"), dispatch); // pass current date
    }
    return () => clearTimeout(timer);
  }, [locationFetched]);

  return (
    <div className="App">
      <div className="video-background">
        <video autoPlay playsInline muted loop preload="auto">
          <source
            src="/movies/starz.mp4"
            type="video/mp4"
            alt="space-background"
          />
        </video>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <ZodiacSwiper fade={fade} />
      <main>
        <Prediction setFade={setFade} />
      </main>
    </div>
  );
}
