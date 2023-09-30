import {
  UPDATE_SIGN,
  UPDATE_DATE,
  UPDATE_TIME,
  UPDATE_TEMP,
  UPDATE_DESCRIPTION,
  UPDATE_PREDICTION,
  UPDATE_LOCATION,
  UPDATE_DAY,
  UPDATE_BUSINESS_NAME,
  UPDATE_BUSINESS_LOCATION,
} from "../actions/index";

const intializeState = {
  signData: "",
  date: "",
  time: "",
  temp: null,
  location: "",
  prediction: "",
  description: "",
  day: "",
  businessName: "",
  businessLocation: "",
};

const userData = (state = intializeState, action) => {
  switch (action.type) {
    case UPDATE_SIGN:
      // console.log("Handling UPDATE_SIGN action", action);
      return {
        ...state,
        signData: action.payload,
      };
    case UPDATE_DATE:
      // console.log("Handling UPDATE_DATEaction", action);
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_TIME:
      // console.log("Handling UPDATE_TIME action", action);
      return {
        ...state,
        time: action.payload,
      };
    case UPDATE_TEMP:
      // console.log("Handling UPDATE_TEMP action", action);
      return {
        ...state,
        temp: action.payload,
      };
    case UPDATE_PREDICTION:
      // console.log("Handling UPDATE_PREDICTION action", action);
      return {
        ...state,
        prediction: action.payload,
      };
    case UPDATE_DESCRIPTION:
      // console.log("Handling UPDATE_DESCRIPTION action", action);
      return {
        ...state,
        description: action.payload,
      };
    case UPDATE_LOCATION:
      // console.log("Handling UPDATE_LOCATION action", action);
      return {
        ...state,
        location: action.payload,
      };
    case UPDATE_DAY:
      // console.log("Handling UPDATE_DAY action", action);
      return {
        ...state,
        day: action.payload,
      };
    case UPDATE_BUSINESS_NAME:
      // console.log("Handling UPDATE_BUSINESS_NAME action", action);
      return {
        ...state,
        businessName: action.payload,
      };
    case UPDATE_BUSINESS_LOCATION:
      // console.log("Handling UPDATE_BUSINESS_LOCATION action", action);
      return {
        ...state,
        businessLocation: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
