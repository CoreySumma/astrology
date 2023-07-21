import React, { useState } from "react";

export default function SignForm({ onSignSelect }) {
  const [selectedSign, setSelectedSign] = useState("");

  const handleChange = (event) => {
    setSelectedSign(event.target.value);
    if (onSignSelect) {
      onSignSelect(event.target.value);
    }
  };

  return (
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
            <option value="">--Choose a sign--</option>
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
        </div>
      </label>
    </form>
  );
}
