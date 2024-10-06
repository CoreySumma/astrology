import React from "react";
import ZodiacSwiper from "../ZodiacSwiper/ZodiacSwiper";
import "./SignSelection.css";

export default function SignSelection({ data, setSign, fade }) {
  return (
    data && (
      <header className="App-header">
        <ZodiacSwiper setSign={setSign} fade={fade} />
      </header>
    )
  );
}
