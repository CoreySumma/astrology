import React, { useEffect, useState, Suspense, lazy } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "./App.css";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import LoadingState from "../../components/LoadingState/LoadingState";
import getLocationFromGoogs from "../../utilities/google-api";
import weatherApi from "../../utilities/weather-api";
import yelpApi from "../../utilities/yelp-api";
import { awsCheckIfVisited } from "../../utilities/aws-database-api";
import { updateDate, updateTime, updateDay } from "../../redux/actions/actions";

dayjs.extend(localeData);

const Prediction = lazy(() => import("../../components/Prediction/Prediction"));
const SpaceBackground = lazy(() => import("../../components/SpaceBackground/SpaceBackground"));
const ZodiacSwiper = lazy(() => import("../../components/ZodiacSwiper/ZodiacSwiper"));


export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const [fade, setFade] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Search term for whatever business you want to show up in the prediction
  // Currently set to yoga but could be set to "coffee", "restaurant", or "museum" etc
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

  // Fire off the Google Maps and Yelp API calls when the user's location is fetched
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
    <div className="App">
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Suspense fallback={<LoadingState />}>
        <SpaceBackground />
        <ZodiacSwiper fade={fade} />
      <main>
        <Prediction setFade={setFade} />
      </main>
      </Suspense>
    </div>
  );
}
