import axios from "axios";
import {
  updateUserExists,
  updateLastDateVisited,
  updateLastPrediction,
} from "../actions";

// Fetch to our AWS gateway endpoint that triggers our Lambda function
export async function awsCheckIfVisited(date, dispatch) {
  try {
    const { data: { ip: ipAddress } } = await axios.get(
      "https://corsproxy.io/?https://api.ipify.org?format=json"
    );    
    const res = await axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      {
        ipAddress,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    // Update Redux store from response
    const { exists, lastDateVisited, pastPrediction } = res.data;
    dispatch(updateUserExists(exists));
    dispatch(updateLastDateVisited(lastDateVisited));
    dispatch(updateLastPrediction(pastPrediction));
  } catch (error) {
    console.log("Error making AWS call - ", error);
  }
}

// add prediction to our DynamoDB table using the same endpoint
// eslint-disable-next-line consistent-return
export async function awsAddPrediction(prediction, date) {
  try {
    // Get user IP address
    const { data: { ip: ipAddress } } = await axios.get(
      "https://corsproxy.io/?https://api.ipify.org?format=json"
    );
    axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      {
        prediction,
        ipAddress,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.log("Error making AWS call - ", error);
  }
}
