import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "./App.css";
import { useDispatch } from "react-redux";
// We use Redux for complex state/data management because it needs to
// be shared back and fourth between components
import useUserData from "../../redux/selectors/userDataSelector";
import Prediction from "../../components/Prediction/Prediction";
import Modal from "../../components/Modal/Modal";
import getLocationFromGoogs from "../../utilities/google-api";
import weatherApi from "../../utilities/weather-api";
import yelpApi from "../../utilities/yelp-api";
import { awsCheckIfVisited } from "../../utilities/aws-database-api";
import ZodiacSwiper from "../../components/ZodiacSwiper/ZodiacSwiper";

dayjs.extend(localeData);

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [sign, setSign] = useState("aries");
  const [locationFetched, setLocationFetched] = useState(false);
  const [fade, setFade] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const {
    description,
    temp,
    location,
    businessName,
    businessLocation,
    userExists,
    prevDateVisited,
    prevPrediction,
  } = useUserData();

  // Search term for whatever business you want to show up in the prediction
  // Currently set to yoga but could be set to "coffee", "restaurant", or "museum" etc
  const search = "yoga";

  const dispatch = useDispatch();

  // Gather time, date, and day of the week data for GPT
  const date = dayjs().format("MM/DD/YYYY");
  const time = dayjs().format("hh:mm A");
  const day = dayjs().format("dddd");

  // On mount get the user's latitude and longitude and the weather
  // (lat and long is baked into the weather API call)
  useEffect(() => {
    weatherApi(setLat, setLong, dispatch);
  }, []);
  // Fire off the Google Maps and Yelp API calls when the user's location is fetched
  useEffect(() => {
    if (long && lat) {
      getLocationFromGoogs(lat, long, dispatch, setLocationFetched);
      yelpApi(search, lat, long, dispatch);
    }
  }, [long, lat]);
  // Grace period of 4 seconds before the modal shows after the location is fetched
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(!locationFetched);
    }, 4000);
    if (locationFetched) {
      awsCheckIfVisited(date, dispatch);
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
      <ZodiacSwiper setSign={setSign} fade={fade} />
      <main>
        <Prediction
          temp={temp}
          date={date}
          time={time}
          description={description}
          sign={sign}
          location={location}
          day={day}
          businessLocation={businessLocation}
          businessName={businessName}
          setFade={setFade}
          isButtonVisible={isButtonVisible}
          setIsButtonVisible={setIsButtonVisible}
          finalPrediction={finalPrediction}
          setFinalPrediction={setFinalPrediction}
          userExists={userExists}
          prevDateVisited={prevDateVisited}
          prevPrediction={prevPrediction}
        />
      </main>
    </div>
  );
}
