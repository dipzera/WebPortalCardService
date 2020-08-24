import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import {LayoutContext} from "../layout/context"
import {localization} from "../../util/localization"

const UpdateApiKeyForm = () => {

  let [inputState, setInputState] = useState(JSON.parse(localStorage.getItem('APIKey')) || '')
  const { current_lang } = useContext(LayoutContext)

  const updateAPIKey = (e) => {
    e.preventDefault()
    axios
      .get("https://api.edi.md/WebPortalCardService/json/UpdateAPIKey?", {
        params: {
          TKey: JSON.parse(localStorage.getItem("Token")),
        },
      })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          localStorage.setItem("APIKey", JSON.stringify(res.data.APIKey));
          setInputState(res.data.APIKey)
        } else {
          console.log(res.data);
          console.log("error");
        }
      });
  };

  return (
      <form style={{ marginTop: "50px" }} onSubmit={updateAPIKey}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="APIKey"
            name={"APIKey"}
            disabled={true}
            value={inputState}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {localization[current_lang].settings.GenerateTokenButton}
        </button>
      </form>
  );
};

export default UpdateApiKeyForm;
