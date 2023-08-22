const intializeState = {
  signData: "",
  date: "",
  time: "",
  temp: "",
  location: ""
};

const userData = (state = intializeState, action) => {
  switch (action.type) {
    case 'ADD_USER_DATA':
      return {
        ...state,
        signData: action.signData,
        date: action.date,
        time: action.time,
        temp: action.temp,
        location: action.location
      };
    default:
      return state;
  }
}

export default userData;