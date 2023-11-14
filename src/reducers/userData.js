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
  UPDATE_REFINED_PREDICTION,
  UPDATE_USER_EXISTS,
  UPDATE_LAST_DATE_VISITED,
  UPDATE_LAST_PREDICTION,
  UPDATE_FINAL_PREDICTION,
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
  refinedPrediction: "",
  userExists: "",
  lastDateVisited: "",
  lastPrediction: "",
  finalPrediction: "",
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
    case UPDATE_REFINED_PREDICTION:
      // console.log("Handling UPDATE_REFINED_PREDICTION action", action);
      return {
        ...state,
        refinedPrediction: action.payload,
      };
    case UPDATE_USER_EXISTS:
      // console.log("Handling UPDATE_USER_EXISTS action", action);
      return {
        ...state,
        userExists: action.payload,
      };
    case UPDATE_LAST_DATE_VISITED:
      // console.log("Handling UPDATE_LAST_DATE_VISITED action", action);
      return {
        ...state,
        lastDateVisited: action.payload,
      };
    case UPDATE_LAST_PREDICTION:
      // console.log("Handling UPDATE_LAST_PREDICTION action", action);
      return {
        ...state,
        lastPrediction: action.payload,
      };
    case UPDATE_FINAL_PREDICTION:
      // console.log("Handling UPDATE_FINAL_PREDICTION action", action);
      return {
        ...state,
        finalPrediction: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
