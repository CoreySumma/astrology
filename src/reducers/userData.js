import {
  UPDATE_SIGN,
  UPDATE_DATE,
  UPDATE_TIME,
  UPDATE_TEMP,
  UPDATE_DESCRIPTION,
  UPDATE_PREDICTION,
  UPDATE_LOCATION,
} from "../actions/index";

const intializeState = {
  signData: "",
  date: "",
  time: "",
  temp: null,
  location: "",
  prediction: "",
  description: "",
};

const userData = (state = intializeState, action) => {
  switch (action.type) {
    case UPDATE_SIGN:
      console.log("Handling UPDATE_SIGN action", action);
      return {
        ...state,
        signData: action.payload,
      };
    case UPDATE_DATE:
      console.log("Handling UPDATE_DATEaction", action);
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_TIME:
      console.log("Handling UPDATE_TIME action", action);
      return {
        ...state,
        time: action.payload,
      };
    case UPDATE_TEMP:
      console.log("Handling UPDATE_TEMP action", action);
      return {
        ...state,
        temp: action.payload,
      };
    case UPDATE_PREDICTION:
      console.log("Handling UPDATE_PREDICTION action", action);
      return {
        ...state,
        prediction: action.payload,
      };
    case UPDATE_DESCRIPTION:
      console.log("Handling UPDATE_DESCRIPTION action", action);
      return {
        ...state,
        description: action.payload,
      };
    case UPDATE_LOCATION:
      console.log("Handling UPDATE_LOCATION action", action);
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
