import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "./App.css";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import Prediction from "../../components/Prediction/Prediction";
import ZodiacSwiper from "../../components/ZodiacSwiper/ZodiacSwiper";
import SpaceBackground from "../../components/SpaceBackground/SpaceBackground";
import getLocationFromGoogs from "../../services/google";
import weatherApi from "../../services/openWeather";
import yelpApi from "../../services/yelpFusion";
import { awsCheckIfVisited } from "../../services/aws";
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
  // (If changed, make sure to tweak the prompts)
  const search = "yoga";

  // On mount get the user's latitude, longitude, day, time, date and weather
  // (lat and long is baked into the weather API call)
  useEffect(() => {
    dispatch(updateDate(dayjs().format("MM/DD/YYYY"))); // current date
    dispatch(updateTime(dayjs().format("hh:mm A"))); // current time
    dispatch(updateDay(dayjs().format("dddd"))); // current day
    weatherApi(setLat, setLong, dispatch);
  }, []);

  // Get exact location with googs & nearest yoga studio
  const isLongAndLatSet = long && lat;
  useEffect(() => {
    if (isLongAndLatSet) {
      getLocationFromGoogs(lat, long, dispatch, setLocationFetched);
      yelpApi(search, lat, long, dispatch);
    }
  }, [isLongAndLatSet]);

  // Grace period of 7 seconds before the modal shows after the location fails to fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(!locationFetched);
    }, 7000);
    if (locationFetched) {
      awsCheckIfVisited(dayjs().format("MM/DD/YYYY"), dispatch); // pass current date
    }
    return () => clearTimeout(timer);
  }, [locationFetched]);

  return (
    <main>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <SpaceBackground />
      <ZodiacSwiper fade={fade} />
      <section className="prediction-section">
        <Prediction setFade={setFade} />
      </section>
    </main>
  );
}
