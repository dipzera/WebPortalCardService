import React, {useContext} from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextError from "../../util/TextError";
import {localization} from "../../util/localization"
import {LayoutContext} from "../layout/context"

const ChangePasswordForm = () => {
  const initialPassword = {
    Password: "",
  };

  const validationSchema = Yup.object({
    Password: Yup.string()
      .min(8, "Minimum 8 characters required")
      .required("Required"),
  });

  const changePassword = (values) => {
    axios
      .get("https://api.edi.md/WebPortalCardService/json/ChangePassword?", {
        params: {
          TKey: JSON.parse(localStorage.getItem("Token")),
          NPassword: values.Password,
        },
      })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          window.location.reload();
        }
      });
  };

  const { current_lang } = useContext(LayoutContext)
  return (
    <Formik
      initialValues={initialPassword}
      onSubmit={changePassword}
      validationSchema={validationSchema}
    >
      <Form style={{ marginTop: "50px" }}>
        <div className="form-group" style={{position: 'relative'}}>
          <Field
            type="password"
            className="form-control"
            id="Password"
            placeholder={localization[current_lang].settings.Password}
            name={"Password"}
          />
          <ErrorMessage name={"Password"} component={TextError} />
        </div>
        <button type="submit" className="btn btn-primary">
          {localization[current_lang].settings.ChangePasswordButton}
        </button>
      </Form>
    </Formik>
  );
};

export default ChangePasswordForm;
