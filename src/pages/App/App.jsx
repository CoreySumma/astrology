import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Prediction from "../../components/Prediction/Prediction";
import Modal from "../../components/Modal/Modal";
import { updateTime, updateDate, updateDay } from "../../redux/actions/actions";
import getLocationFromGoogs from "../../utilities/google-api";
import weatherApi from "../../utilities/weather-api";
import getMeetUp from "../../utilities/meetup-api";
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

  // Search term for whatever business you want to show up in the prediction
  // Currently set to yoga but could be set to "coffee", "restaurant", or "museum" etc
  const search = "yoga";

  const dispatch = useDispatch();

  useEffect(() => {
    // Gather time, date, and day of the week data for GPT
    const date = dayjs().format("MM/DD/YYYY");
    const time = dayjs().format("hh:mm A");
    const dayOfWeek = dayjs().format("dddd");
    dispatch(updateDay(dayOfWeek));
    dispatch(updateDate(date));
    dispatch(updateTime(time));
    // Call the weather API with arguments which also gets user longitude and latitude
    weatherApi(setLat, setLong, dispatch);
    if (long && lat) {
      // Call the google maps API to get the city name, state etc of the user
      // and then call the Yelp API to get the nearest yoga studio
      getLocationFromGoogs(lat, long, dispatch, setLocationFetched);
      getMeetUp(search, lat, long, dispatch);
    }
  }, [lat, long, locationFetched]);

  // Redux for retrieving data from the store for state to pass to GPT prompts
  const description = useSelector((state) => state.userData.description);
  const temp = useSelector((state) => state.userData.temp);
  const date = useSelector((state) => state.userData.date);
  const time = useSelector((state) => state.userData.time);
  const location = useSelector((state) => state.userData.location);
  const day = useSelector((state) => state.userData.day);
  const businessName = useSelector((state) => state.userData.businessName);
  const businessLocation = useSelector(
    (state) => state.userData.businessLocation
  );
  const userExists = useSelector((state) => state.userData.userExists);
  const prevDateVisited = useSelector(
    (state) => state.userData.lastDateVisited
  );
  const prevPrediction = useSelector((state) => state.userData.lastPrediction);

  // Grace period of 4 seconds before the modal shows
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
          fade={fade}
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
