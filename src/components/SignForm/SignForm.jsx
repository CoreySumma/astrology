import React, { useState } from "react";
import "./SignForm.css";
import gptApi from "../../utilities/gpt-api";


export default function SignForm() {
  const [selectedSign, setSelectedSign] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setSelectedSign(e.target.value);
    if (e.target.value) {
      gptApi(e.target.value).then((result) => {
        setResult(result);
      });
    }
  };
  
  return (
    <>
      <form className="form-container">
        <label>
          Select your astrological sign:
          <br />
          <div className="selector">
            <select
              value={selectedSign}
              onChange={handleChange}
              className="selector"
            >
              <option value="">My Sign Is...</option>
              <option value="aries">Aries</option>
              <option value="taurus">Taurus</option>
              <option value="gemini">Gemini</option>
              <option value="cancer">Cancer</option>
              <option value="leo">Leo</option>
              <option value="virgo">Virgo</option>
              <option value="libra">Libra</option>
              <option value="scorpio">Scorpio</option>
              <option value="sagittarius">Sagittarius</option>
              <option value="capricorn">Capricorn</option>
              <option value="aquarius">Aquarius</option>
              <option value="Pisces">Pisces</option>
            </select>
            <hr />
          </div>
        </label>
      </form>
    </>
  );
}
