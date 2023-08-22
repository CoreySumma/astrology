export const updateSign = (sign) => {
  return {
    type: UPDATE_SIGN,
    payload: sign,
  };
};

export const updateDate = (date) => {
  return {
    type: UPDATE_DATE,
    payload: date,
  };
}

export const updateTime = (time) => {
  return {
    type: UPDATE_TIME,
    payload: time,
  };
}

export const updateTemp = (temp) => {
  return {
    type: UPDATE_TEMP,
    payload: temp,
  };
}
