/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import posthog from "posthog-js";
import App from "./pages/App/App";
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./redux/reducers/rootReducer";

// If you forked this you can delete this block unless you want
// to use PostHog for analytics
posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
  api_host: "https://us.i.posthog.com", 
  capture_pageview: true, 
  session_recording: {
    captureConsoleLogs: true, 
    recordCanvas: true,      
    samplingRate: 100,   
  },
});

const store = configureStore({
  reducer: rootReducer,
});

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
