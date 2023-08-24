import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import "./SignForm.css";
import gptApi from "../../utilities/gpt-api";
import { gptPrompt } from "../../utilities/gpt-prompt";
import { updateSign } from "../../actions";
import userData from "../../reducers/userData";

export default function SignForm({ sign, setSign }) {
  const [selectedSign, setSelectedSign] = useState("");
  const [result, setResult] = useState("");
  const dispatch = useDispatch();
  // Redux line for retrieving data from the store for user's sign
  const signState = useSelector((state) => state.userData.signData);

  const handleChange = (e) => {
    const sign = e.target.value;
    setSelectedSign(sign);
    setSign(sign);
    dispatch(updateSign(sign));
  };

  useEffect(() => {
    console.log(
      "this is current state saved in store using the store import",
      store.getState()
    );
    console.log("Sign state from useSelector:", signState);
  }, [signState]);

  useEffect(() => {
    if (sign !== "") {
      gptApi(sign).then((result) => {
        setResult(result);
      });
    }
  }, [sign]);

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
