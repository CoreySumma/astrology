import { useSelector } from "react-redux";

const useUserData = () => {
  const description = useSelector((state) => state.userData.description);
  const temp = useSelector((state) => state.userData.temp);
  const location = useSelector((state) => state.userData.location);
  const businessName = useSelector((state) => state.userData.businessName);
  const businessLocation = useSelector(
    (state) => state.userData.businessLocation
  );
  const userExists = useSelector((state) => state.userData.userExists);
  const prevDateVisited = useSelector(
    (state) => state.userData.lastDateVisited
  );
  const prevPrediction = useSelector((state) => state.userData.lastPrediction);
  const prediction = useSelector((state) => state.userData.prediction);

  return {
    description,
    temp,
    location,
    businessName,
    businessLocation,
    userExists,
    prevDateVisited,
    prevPrediction,
    prediction,
  };
};

export default useUserData;
