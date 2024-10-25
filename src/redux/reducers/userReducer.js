import {
  UPDATE_TEMP,
  UPDATE_PREDICTION,
  UPDATE_DESCRIPTION,
  UPDATE_LOCATION,
  UPDATE_BUSINESS_NAME,
  UPDATE_BUSINESS_LOCATION,
  UPDATE_REFINED_PREDICTION,
  UPDATE_USER_EXISTS,
  UPDATE_LAST_DATE_VISITED,
  UPDATE_LAST_PREDICTION,
  UPDATE_FINAL_PREDICTION,
  UPDATE_SHORTENED_PREDICTION,
} from "../actions/actions";

const initialState = {
  temp: null,
  location: "",
  prediction: "",
  description: "",
  businessName: "",
  businessLocation: "",
  refinedPrediction: "",
  userExists: "",
  lastDateVisited: "",
  lastPrediction: "",
  finalPrediction: "",
  shortenedPrediction: "",
};

const userData = (state = initialState, action = {}) => {
  switch (action.type) {
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
    case UPDATE_REFINED_PREDICTION:
      return {
        ...state,
        refinedPrediction: action.payload,
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
    case UPDATE_FINAL_PREDICTION:
      return {
        ...state,
        finalPrediction: action.payload,
      };
    case UPDATE_SHORTENED_PREDICTION:
      return {
        ...state,
        shortenedPrediction: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
