import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SignForm.css";
import { updateSign } from "../../actions";

export default function SignForm({ sign, setSign }) {
  const [selectedSign, setSelectedSign] = useState("");
  const dispatch = useDispatch();
  // Redux line for retrieving data from the store for user's sign
  const signState = useSelector((state) => state.userData.signData);

  const handleChange = (e) => {
    const sign = e.target.value;
    setSelectedSign(sign);
    setSign(sign);
    dispatch(updateSign(sign));
  };

  return (
    <>
      <form className="form-container">
        <label>
          Select your zodiac sign:
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
