import {
  UPDATE_SIGN,
  UPDATE_DATE,
  UPDATE_TIME,
  UPDATE_DAY,
  UPDATE_TEMP,
  UPDATE_PREDICTION,
  UPDATE_DESCRIPTION,
  UPDATE_LOCATION,
  UPDATE_BUSINESS_NAME,
  UPDATE_BUSINESS_LOCATION,
  UPDATE_USER_EXISTS,
  UPDATE_LAST_DATE_VISITED,
  UPDATE_LAST_PREDICTION,
} from "../actions/actions";

const initialState = {
  sign: "Aries",
  date: "",
  time: "",
  day: "",
  temp: null,
  location: "",
  prediction: "",
  description: "",
  businessName: "",
  businessLocation: "",
  userExists: "",
  lastDateVisited: "",
  lastPrediction: "No prediction available",
};

const userData = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SIGN:
      return {
        ...state,
        sign: action.payload,
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case UPDATE_DAY:
      return {
        ...state,
        day: action.payload,
      };
    case UPDATE_TEMP:
      return {
        ...state,
        temp: action.payload,
      };
    case UPDATE_PREDICTION:
      return {
        ...state,
        prediction: action.payload,
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case UPDATE_BUSINESS_NAME:
      return {
        ...state,
        businessName: action.payload,
      };
    case UPDATE_BUSINESS_LOCATION:
      return {
        ...state,
        businessLocation: action.payload,
      };
    case UPDATE_USER_EXISTS:
      return {
        ...state,
        userExists: action.payload,
      };
    case UPDATE_LAST_DATE_VISITED:
      return {
        ...state,
        lastDateVisited: action.payload,
      };
    case UPDATE_LAST_PREDICTION:
      return {
        ...state,
        lastPrediction: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
