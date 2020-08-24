import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logoSm2 from "../assets/images/is-logo-pic.png";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../util/TextError";
import Select from "react-select";
import { SelectLanguage } from "../util/SelectLanguage";
import { SelectCountry } from "../util/SelectCountry";
import avatar from "../assets/images/download.png";
import { getBase64Image } from "../util/logoHandler";
import TextAlert from "../alert/TextAlert"
import Modal from 'react-modal'

export const RegisterPage = () => {
  /* Form validation library */
  const validationSchema = Yup.object({
    // CommercialName: Yup.string().required('Required'),
    JuridicalName: Yup.string().required("Required"),
    IDNO: Yup.string().required("Required"),
    email: Yup.string()
      .email("Invalid email format!")
      .required("Required")
      .lowercase(),
    JuridicalAddress: Yup.string().required("Required"),
    OfficeAddress: Yup.string().required("Required"),
    Bank: Yup.string().required("Required"),
    IBAN: Yup.string().required("Required"),
    BIC: Yup.string().required("Required"),
    VATCode: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Minimum 8 characters required!"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Password must be the same!")
      .required("Required"),
  });

  // let avatar = document.querySelector(".register-form__group img");
  // let base64 = getBase64Image(avatar);

  const logoRef = useRef(null);

  const initialValues = {
    CommercialName: "",
    JuridicalName: "",
    IDNO: "",
    email: "",
    JuridicalAddress: "",
    OfficeAddress: "",
    Bank: "",
    Language: "ro",
    Logo: "",
    CountryID: 1,
    IBAN: "",
    BIC: "",
    VATCode: "",
    password: "",
    passwordConfirm: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false)

  const changeSubmitButtonState = (e) => {
    e.innerText = "Accessați email-ul";
    e.disabled = true;
  };

  const onSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        BIC: values.BIC,
        Bank: values.Bank,
        CommercialName:
          values.CommercialName === ""
            ? values.JuridicalName
            : values.CommercialName,
        CountryID: values.CountryID, // ----
        Email: values.email,
        IBAN: values.IBAN,
        IDNO: values.IDNO,
        JuridicalAddress: values.JuridicalAddress,
        JuridicalName: values.JuridicalName,
        Language: values.Language,
        Logo: logoRef.current.src, // ----
        OfficeAddress: values.OfficeAddress,
        VATCode: values.VATCode,
        password: values.passwordConfirm,
      }),
    };
    fetch(
      "https://api.edi.md/WebPortalCardService/json/NewRegistration",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.ErrorCode === 0) {
          setRegistered(true);
          resetForm({});
          /* SEND EMAIL */
        } else {
          setError(true);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    console.log(JSON.parse(requestOptions.body));
  };

  const languageOptions = [
    { value: "ro", label: "Română" },
    { value: "ru", label: "Rusă" },
  ];

  const handleCountryOptions = () => {
    let items = [];
    fetch("https://api.edi.md/WebPortalCardService/json/GetCountry")
      .then((response) => response.json())
      .then((data) => {
        data.ListCountry.map((item) => {
          items.push({
            value: item.ID,
            label: item.Name,
          });
        });
      })
      .catch((error) => console.log(error));
    return items;
  };

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
                        <h5 className="mt-3">
                          <b>Înregistrează-te</b>
                        </h5>
                      </div>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                      >
                        <Form className="form mt-5 contact-form">
                          <div
                            className="register-form__group"
                            style={{ display: "none" }}
                          >
                            <img
                              ref={logoRef}
                              className="avatar"
                              src={avatar}
                            />
                          </div>
                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="CommercialName"
                                type="text"
                                placeholder="Denumire comercială"
                              />
                              <ErrorMessage
                                name={"CommercialName"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="JuridicalName"
                                type="text"
                                placeholder="Denumire juridică *"
                                required
                              />
                              <ErrorMessage
                                name={"JuridicalName"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="IDNO"
                                type="text"
                                placeholder="IDNO *"
                                required
                              />
                              <ErrorMessage
                                name={"IDNO"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="email"
                                type="text"
                                placeholder="Adresă de email *"
                                required
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
                                className="form-control form-control-line"
                                name="JuridicalAddress"
                                type="text"
                                placeholder="Adresă juridică *"
                                required
                              />
                              <ErrorMessage
                                name={"JuridicalAddress"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="OfficeAddress"
                                type="text"
                                placeholder="Adresă fizică *"
                                required
                              />
                              <ErrorMessage
                                name={"OfficeAddress"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="Bank"
                                type="text"
                                placeholder="Banca *"
                                required
                              />
                              <ErrorMessage
                                name={"Bank"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="IBAN"
                                type="text"
                                placeholder="IBAN *"
                                required
                              />
                              <ErrorMessage
                                name={"IBAN"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="BIC"
                                type="text"
                                placeholder="B.I.C *"
                                required
                              />
                              <ErrorMessage
                                name={"BIC"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="VATCode"
                                type="text"
                                placeholder="Codul TVA *"
                                required
                              />
                              <ErrorMessage
                                name={"VATCode"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group select">
                            <div className="col-sm-12 form-group__select">
                              <div className={"form-group__select-item"}>
                                <span>Alegeți limba</span>
                                <Field
                                  name={"Language"}
                                  component={SelectLanguage}
                                  options={languageOptions}
                                />
                              </div>
                              <div className={"form-group__select-item"}>
                                <span>Alegeți țara</span>
                                <Field
                                  name={"CountryID"}
                                  component={SelectCountry}
                                  options={handleCountryOptions()}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="password"
                                type="password"
                                placeholder="Parola"
                                required
                              />
                              <ErrorMessage
                                name={"password"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="col-sm-12">
                              <Field
                                className="form-control form-control-line"
                                name="passwordConfirm"
                                type="password"
                                placeholder="Confirmă parola"
                                required
                              />
                              <ErrorMessage
                                name={"passwordConfirm"}
                                component={TextError}
                              />
                            </div>
                          </div>

                          {/*                        <div className="form-group">
                            <div className="col-12">
                              <label className="cr-styled">
                                <Field type="checkbox" checked>
                                  <i className="fa"></i>
                                  I accept <a href="">Terms and Conditions</a>
                              </label>
                            </div>
                          </div>*/}

                          <div className="form-group">
                            {registered ? (
                              <TextAlert>
                                V-ați înregistrat cu succes, pentru a confirma
                                datele introduse, accesați email-ul
                                dumneavoastră!
                              </TextAlert>
                            ) : (
                              <div className="col-sm-12 mt-4">
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
                                    Înregistrează-te
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          <Modal
                            isOpen={error}
                            shouldCloseOnEsc={true}
                            shouldCloseOnOverlayClick={true}
                            style={{
                              overlay : {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'no-scroll'
                              },
                              content: {
                                width: 300,
                                height: 75,
                                position: 'static'
                              },
                            }}
                          >
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                              Utilizator cu aceste date deja există!
                              <button onClick={() => setError(false)}>X</button>
                            </div>
                          </Modal>

                          <div className="form-group">
                            <div className="col-sm-12 mt-4 text-center">
                              <NavLink to={"/login"}>Deja ai un cont?</NavLink>
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
