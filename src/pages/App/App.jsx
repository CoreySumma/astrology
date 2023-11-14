import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header.jsx";
import DayAtAGlance from "../../components/DayAtAGlance/DayAtAGlance.jsx";
import Modal from "../../components/Modal/Modal";
import {
  updateTime,
  updateLocation,
  updateDate,
  updateDay,
} from "../../actions";
import getLocationFromGoogs from "../../utilities/google-api";
import weatherApi from "../../utilities/weather-api";
import moonApi from "../../utilities/moon-api";
import getMeetUp from "../../utilities/meetup-api";
import {awsCheckIfVisited} from "../../utilities/aws-database-api";

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  // "Data" is actually openWeather api data
  const [data, setData] = useState([]);
  const [moonData, setMoonData] = useState(null);
  const [sign, setSign] = useState("aries");
  // Flag to check if location has been fetched to avoid constant calling of API
  const [locationFetched, setLocationFetched] = useState(false);
  // Flag to fade everything out after button is clicked
  const [fade, setFade] = useState(false);
  // Flag to hide the button indefinitely after the click
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  // Flag if the component mounted for message to be displayed to user on load
  const isMounted = useRef(false);
  // Flag for Modal
  const [showModal, setShowModal] = useState(false);
  // Final prediction state if user visited
  const [finalPrediction, setFinalPrediction] = useState("");

  // Redux
  const dispatch = useDispatch();

  // One useEffect to rule them all
  useEffect(() => {
    // Get the date for GPT
    const dateObj = new Date();
    const newDate = dateObj.toLocaleDateString();
    let time = new Date().toLocaleTimeString("en-US", {
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
    // Convert Date for what moon API accepts
    let month = dateObj.getMonth() + 1; // getMonth() returns months from 0-11, so add 1 to get the correct month
    month = month < 10 ? "0" + month : month; // add leading zero if month is single digit
    let day = dateObj.getDate();
    day = day < 10 ? "0" + day : day; // add leading zero if day is single digit
    const moonDate = `${dateObj.getFullYear()}-${month}-${day}`;
    // Save to redux store
    dispatch(updateDay(dayOfWeek));
    dispatch(updateDate(newDate));
    dispatch(updateTime(time));
    // Call the weather API with arguments which also gets user longitude and latitude
    weatherApi(lat, long, setLat, setLong, setData, dispatch);
    if (long && lat) {
      // Call the google maps API to get the city name, state etc of the user
      getLocationFromGoogs(lat, long, dispatch, setLocationFetched);
      // Call the moon API with arguments to get moon phase image and display it with local state
      // moonApi(setMoonData, lat, long, moonDate);
      // Set your search terms for business's in your area
      let search = "yoga";
      // Call the yelp API with arguments (right now it searches business name not events despite naming convention of 'getMeetUp')
      getMeetUp(search, lat, long, dispatch);
    }
  }, [lat, long, dispatch, locationFetched]);

  // Redux for retrieving data from the store for state to pass to components/GPT
  let description = useSelector((state) => state.userData.description);
  let temp = useSelector((state) => state.userData.temp);
  let date = useSelector((state) => state.userData.date);
  let time = useSelector((state) => state.userData.time);
  let location = useSelector((state) => state.userData.location);
  let day = useSelector((state) => state.userData.day);
  let businessName = useSelector((state) => state.userData.businessName);
  let businessLocation = useSelector(
    (state) => state.userData.businessLocation
  );
  let userExists = useSelector((state) => state.userData.userExists);
  let prevDateVisited = useSelector((state) => state.userData.lastDateVisited);
  let prevPrediction = useSelector((state) => state.userData.lastPrediction);

  // This is polite message to the user to allow location access if not found
  // It's basically a useEffect loop that runs if every 6 seconds if location is not fetched and checks if the location has been fetched and escapes the loop if it has
  useEffect(() => {
    if (locationFetched) {
      // Location has been fetched, immediately decide not to show Modal
      setShowModal(false);
      // Check if user has visited before (cheap way of doing this without clean logic for component mount)
      awsCheckIfVisited(date, dispatch);
      return; // Exit the useEffect
    }
    const timer = setTimeout(() => {
      if (locationFetched) {
        setShowModal(false);
        awsCheckIfVisited(date, dispatch);
      } else {
        setShowModal(true);
      }
    }, 6000);
    return () => clearTimeout(timer); // Clean up timer on unmount or if useEffect runs again
  }, [locationFetched]);

  return (
    <>
      <div className="App">
        <div className="video-background">
          <video autoPlay={true} playsInline muted loop preload="auto">
            <source src="/movies/starz.mp4" type="video/mp4" />
          </video>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <Header
          data={data}
          time={time}
          sign={sign}
          setSign={setSign}
          fade={fade}
          setFade={setFade}
        />
        <main>
          <DayAtAGlance
            temp={temp}
            date={date}
            time={time}
            description={description}
            sign={sign}
            location={location}
            day={day}
            moonData={moonData}
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
    </>
  );
}
