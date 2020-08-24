import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoSm2 from "../assets/images/is-logo-pic.png";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../util/TextError";
import TextAlert from "../alert/TextAlert"

export const RecoveryPage = () => {
  const initialValue = {
    Email: "",
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid email format").required("Required"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false)
  const resetPassword = (values) => {
    axios
      .get("https://api.edi.md/WebPortalCardService/json/ResetPassword?", {
        params: {
          Login: values.Email,
        },
      })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          setRegistered(true);
          setError(false)
        } else {
          setRegistered(false)
          setIsLoading(false)
          setError(true)
        }
      });
  };

  return (
    <section className={"bg-login"}>
      <Formik
        onSubmit={resetPassword}
        initialValues={initialValue}
        validationSchema={validationSchema}
      >
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
                          <h5 className="mt-3">
                            <b>Resetează parola</b>
                          </h5>
                        </div>
                        <Form className="text-center contact-form">
                          {/*<div className="alert alert-info alert-dismissable mt-4">*/}
                          {/*  <button*/}
                          {/*    type="button"*/}
                          {/*    className="close text-white"*/}
                          {/*    data-dismiss="alert"*/}
                          {/*    aria-hidden="true"*/}
                          {/*  >*/}
                          {/*    ×*/}
                          {/*  </button>*/}
                          {/*  Introdu adresa de <b>email</b> și urmează pașii*/}
                          {/*  următori!*/}
                          {/*</div>*/}

                          <div className="form-group mt-5">
                            <div className="form-group">
                              {error && (
                                <TextAlert error={true}>Adresa de email este incorectă!</TextAlert>
                              )}
                              <div className="col-sm-12">
                                <Field
                                  type="email"
                                  className="form-control"
                                  placeholder="Adresa de email"
                                  required="required"
                                  name={"Email"}
                                  id={"Email"}
                                />
                                <ErrorMessage
                                  name={"Email"}
                                  component={TextError}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            {registered ? (
                              <TextAlert>
                                Ați resetat parola cu succes, o parolă nouă a
                                fost trimisă pe email-ul dvs.
                              </TextAlert>
                            ) : (
                              <div className="col-sm-12 mt-3 px-0">
                                {isLoading ? (
                                  <button
                                    className="btn btn-disabled btn-block"
                                    type="submit"
                                  >
                                    Se încarcă...
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                  >
                                    Resetează
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          <NavLink to={"/login"}>
                            Înapoi la formularul de conectare
                          </NavLink>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </section>
  );
};
