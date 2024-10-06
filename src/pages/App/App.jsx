import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Prediction from "../../components/Prediction/Prediction";
import Modal from "../../components/Modal/Modal";
import { updateTime, updateDate, updateDay } from "../../actions";
import getLocationFromGoogs from "../../utilities/google-api";
import weatherApi from "../../utilities/weather-api";
import getMeetUp from "../../utilities/meetup-api";
import { awsCheckIfVisited } from "../../utilities/aws-database-api";
import ZodiacSwiper from "../../components/ZodiacSwiper/ZodiacSwiper";

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  // "Data" is actually openWeather api data
  const [data, setData] = useState([]);
  const [sign, setSign] = useState("aries");
  // Flag to check if location has been fetched to avoid constant calling of API
  const [locationFetched, setLocationFetched] = useState(false);
  // Flag to fade everything out after button is clicked
  const [fade, setFade] = useState(false);
  // Flag to hide the button indefinitely after the click
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");

  const dispatch = useDispatch();

  // One useEffect to rule them all(this is kinda bad I think)
  useEffect(() => {
    // Get the date for GPT
    const dateObj = new Date();
    const newDate = dateObj.toLocaleDateString();
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    // Get the day of the week for GPT
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    // Save to redux store
    dispatch(updateDay(dayOfWeek));
    dispatch(updateDate(newDate));
    dispatch(updateTime(time));
    // Call the weather API with arguments which also gets user longitude and latitude
    weatherApi(setLat, setLong, setData, dispatch);
    if (long && lat) {
      // Call the google maps API to get the city name, state etc of the user
      getLocationFromGoogs(lat, long, dispatch, setLocationFetched);
      // Call the moon API with arguments to get moon phase image and display it with local state
      // moonApi(setMoonData, lat, long, moonDate);
      // Set your search terms for business's in your area
      const search = "yoga";
      // Call the yelp API with arguments (right now it searches business name not events despite naming convention of 'getMeetUp')
      getMeetUp(search, lat, long, dispatch);
    }
  }, [lat, long, dispatch, locationFetched]);

  // Redux for retrieving data from the store for state to pass to components/GPT
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

  // This is polite message to the user to allow location access if not found
  // It's basically a useEffect loop that runs if every 6 seconds if location
  // is not fetched and checks if the location has been fetched and escapes the loop if it has
  useEffect(() => {
    if (locationFetched) {
      setShowModal(false);
      awsCheckIfVisited(date, dispatch);
      return; 
    }
    const timer = setTimeout(() => {
      if (locationFetched) {
        setShowModal(false);
        awsCheckIfVisited(date, dispatch);
      } else {
        setShowModal(true);
      }
    }, 6000);
    clearTimeout(timer);
  }, [date, dispatch, locationFetched]);

  return (
    <div className="App">
      <div className="video-background">
        <video autoPlay playsInline muted loop preload="auto">
          <source src="/movies/starz.mp4" type="video/mp4" />
        </video>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <ZodiacSwiper
        data={data}
        time={time}
        sign={sign}
        setSign={setSign}
        fade={fade}
        setFade={setFade}
      />
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
