import axios from "axios";
import {
  updateUserExists,
  updateLastDateVisited,
  updateLastPrediction,
} from "../actions";

// Fetch to our AWS gateway endpoint that triggers our Lambda function
// We are grabing the users ip address and if it's not there stores it in our DynamoDB table
// If it is there it returns a flag to let us know it's already there
// If not, the table will save ip address, and the date
export async function awsCheckIfVisited(date, dispatch) {
  try {
    console.log("aws checkVisited function enetered");
    // Get user IP address
    const ipRes = await axios.get(
      "https://corsproxy.io/?https://api.ipify.org?format=json"
    );
    const ipAddress = ipRes.data.ip;
    const data = {
      ipAddress: ipAddress,
      date: date,
    };
    // Send data to our AWS gateway endpoint
    const res = await axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log("console log response from AWS -->", res.data);
    // Update Redux store with response from our gateway endpoint
    const exists = res.data.exists;
    const lastDateVisited = res.data.lastDateVisited;
    const pastPrediction = res.data.pastPrediction;
    dispatch(updateUserExists(exists));
    dispatch(updateLastDateVisited(lastDateVisited));
    dispatch(updateLastPrediction(pastPrediction));
    return res.data;
  } catch (error) {
    console.log("Error making AWS call - ", error);
  }
}

// function to add prediction to our DynamoDB table using the same endpoint

export async function awsAddPrediction(prediction, date) {
  try {
    console.log("aws Add prediction function enetered");
    // Get user IP address
    const ipRes = await axios.get(
      "https://corsproxy.io/?https://api.ipify.org?format=json"
    );
    const ipAddress = ipRes.data.ip;
    const data = {
      prediction: prediction,
      ipAddress: ipAddress,
      date: date,
    };
    // Send data to our AWS gateway endpoint
    const res = await axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log("console log response from AWS -->", res.data);
    return res.data;
  } catch (error) {
    console.log("Error making AWS call - ", error);
  }
}
