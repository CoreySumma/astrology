export const UPDATE_SIGN = 'UPDATE_SIGN';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const UPDATE_TEMP = 'UPDATE_TEMP';
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';


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

export const updateDescription = (description) => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: description,
  };
}

export const updatePrediction = (prediction) => {
  return {
    type: UPDATE_PREDICTION,
    payload: prediction,
  };
}

