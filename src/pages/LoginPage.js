import React, { useEffect } from "react";
import logoSm2 from "../assets/images/is-logo-pic.png";
import * as Yup from "yup";

import { NavLink, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import TextError from "../util/TextError";
import TextAlert from "../alert/TextAlert"

export const LoginPage = () => {
  /* Form validation library */
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters required")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)

  let history = useHistory();

  const onSubmit = (values) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name: values.email, Password: values.password }),
    };

    console.log(requestOptions);
    fetch("https://api.edi.md/WebPortalCardService/json/Logon", requestOptions)
      .then((response) => response.json())
      .then((loginData) => {
        if (loginData.ErrorCode === 0) {
          localStorage.setItem("Token", JSON.stringify(loginData.TKey));
          localStorage.setItem(
            "CommercialName",
            JSON.stringify(loginData.Company.CommercialName)
          );
          localStorage.setItem("BIC", JSON.stringify(loginData.Company.BIC));
          localStorage.setItem("Bank", JSON.stringify(loginData.Company.Bank));
          localStorage.setItem(
            "Email",
            JSON.stringify(loginData.Company.Email)
          );
          localStorage.setItem("IBAN", JSON.stringify(loginData.Company.IBAN));
          localStorage.setItem("IDNO", JSON.stringify(loginData.Company.IDNO));
          localStorage.setItem(
            "JuridicalAddress",
            JSON.stringify(loginData.Company.JuridicalAddress)
          );
          localStorage.setItem(
            "JuridicalName",
            JSON.stringify(loginData.Company.JuridicalName)
          );
          localStorage.setItem(
            "Language",
            JSON.stringify(loginData.Company.Language)
          );
          localStorage.setItem(
            "OfficeAddress",
            JSON.stringify(loginData.Company.OfficeAddress)
          );
          localStorage.setItem(
            "VATCode",
            JSON.stringify(loginData.Company.VATCode)
          );
          localStorage.setItem(
            "CountryID",
            JSON.stringify(loginData.Company.CountryID)
          );
          localStorage.setItem("Logo", JSON.stringify(loginData.Company.Logo));
          localStorage.setItem(
            "APIKey",
            JSON.stringify(loginData.Company.APIKey)
          );
          localStorage.setItem("Logo", JSON.stringify(loginData.Company.Logo));
          history.push("/");
        } else {
          setError(true)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  /* Instead of onChange={formik.handleChange} value={formik.values.email/password} onBlur={formik.handleBlur}
   *   we can just {...formik.getFieldProps('here insert the input name')} or use Formik component */

  const [checked, setChecked] = useState();

  return (
    <section className="bg-login">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="wrapper-page">
              <div className="account-pages">
                <div className="account-box">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="card-title text-center">
                        <img src={logoSm2} alt="" className="" />
                        {/*<h5 className="mt-3">*/}
                        {/*  <b>Welcome to E-factura</b>*/}
                        {/*</h5>*/}
                      </div>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                      >

                        <Form className="form mt-5 contact-form">
                          {error && (
                            <TextAlert error={true}>Adresa de email sau parola este incorecta!</TextAlert>
                          )}
                          <div className="form-group ">

                            <div className="col-sm-12">

                              <Field
                                id="email"
                                className="form-control form-control-line"
                                type="email"
                                placeholder="Adresă de email"
                                required={true}
                                name={"email"}
                              />
                              <ErrorMessage
                                name={"email"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">

                            <div className="col-sm-12">

                              <Field
                                id={"password"}
                                className="form-control form-control-line"
                                type="password"
                                placeholder="Parola"
                                required={true}
                                name={"password"}
                              />
                              <ErrorMessage
                                name={"password"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          {/*<div className="form-group">*/}
                          {/*  <div className="col-12">*/}
                          {/*    <label className="cr-styled">*/}
                          {/*      <input*/}
                          {/*        id={"checkbox"}*/}
                          {/*        type="checkbox"*/}
                          {/*        checked={checked}*/}
                          {/*        onChange={() => setChecked(!checked)}*/}
                          {/*      />*/}
                          {/*      <i className="fa" />*/}
                          {/*      <span>Remember me</span>*/}
                          {/*    </label>*/}
                          {/*  </div>*/}
                          {/*</div>*/}

                          <div className="form-group">
                            <div className="col-sm-12 mt-4">
                              {isLoading ? (
                                <button
                                  id={"submitButton"}
                                  className="btn btn-disabled btn-block"
                                  style={{ background: "gray" }}
                                  type="submit"
                                >
                                  Se încarcă...
                                </button>
                              ) : (
                                <button
                                  id={"submitButton"}
                                  className="btn btn-primary btn-block"
                                  type="submit"
                                >
                                  Logare
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="col-sm-12 mt-4 text-center">
                              <NavLink to={"/recovery"}>
                                <i className="fa fa-lock" />
                                <span style={{ marginLeft: "5px" }}>
                                  Ați uitat parola?
                                </span>
                              </NavLink>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="col-sm-12 mt-4 text-center">
                              <NavLink to={"/register"}>
                                <i className="fa fa-users" />
                                <span style={{ marginLeft: "5px" }}>
                                  Creează un cont
                                </span>
                              </NavLink>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
