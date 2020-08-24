import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import Thumb from "./FileReader";
import FileBase64 from "react-file-base64";
import { getBase64Image } from "../../util/logoHandler";
import { localization } from "../../util/localization";
import { LayoutContext } from "../layout/context";
import TextError from "../../alert/TextError";
import * as Yup from "yup";

const UpdateCompanyForm = () => {
  const updateCompanyValues = {
    CommercialName: JSON.parse(localStorage.getItem("CommercialName")),
    JuridicalName: JSON.parse(localStorage.getItem("JuridicalName")),
    IDNO: JSON.parse(localStorage.getItem("IDNO")),
    Email: JSON.parse(localStorage.getItem("Email")),
    JuridicalAddress: JSON.parse(localStorage.getItem("JuridicalAddress")),
    OfficeAddress: JSON.parse(localStorage.getItem("OfficeAddress")),
    Bank: JSON.parse(localStorage.getItem("Bank")),
    IBAN: JSON.parse(localStorage.getItem("IBAN")),
    BIC: JSON.parse(localStorage.getItem("BIC")),
    VATCode: JSON.parse(localStorage.getItem("VATCode")),
    files: [],
  };
  const validationSchema = Yup.object({
    CommercialName: Yup.string().required("Required"),
    JuridicalName: Yup.string().required("Required"),
    IDNO: Yup.string().required("Required"),
    Email: Yup.string()
      .email("Invalid email format!")
      .required("Required")
      .lowercase(),
    JuridicalAddress: Yup.string().required("Required"),
    OfficeAddress: Yup.string().required("Required"),
    Bank: Yup.string().required("Required"),
    IBAN: Yup.string().required("Required"),
    BIC: Yup.string().required("Required"),
    VATCode: Yup.string().required("Required"),
  });

  const updateCompany = (values) => {
    const requestOptions = {
      CommercialName: values.CommercialName,
      JuridicalName: values.JuridicalName,
      IDNO: values.IDNO,
      Email: values.Email,
      JuridicalAddress: values.JuridicalAddress,
      OfficeAddress: values.OfficeAddress,
      Bank: values.Bank,
      IBAN: values.IBAN,
      BIC: values.BIC,
      VATCode: values.VATCode,
      Logo: values.files.base64,
    };
    axios
      .post(
        "https://api.edi.md/WebPortalCardService/json/UpdateCompany",
        requestOptions
      )
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          localStorage.setItem("BIC", JSON.stringify(values.BIC));
          localStorage.setItem("Bank", JSON.stringify(values.Bank));
          localStorage.setItem(
            "CommercialName",
            JSON.stringify(values.CommercialName)
          );
          localStorage.setItem("Email", JSON.stringify(values.Email));
          localStorage.setItem("IBAN", JSON.stringify(values.IBAN));
          localStorage.setItem("VATCode", JSON.stringify(values.VATCode));
          localStorage.setItem(
            "JuridicalName",
            JSON.stringify(values.JuridicalName)
          );
          localStorage.setItem(
            "JuridicalAddress",
            JSON.stringify(values.JuridicalAddress)
          );
          localStorage.setItem(
            "OfficeAddress",
            JSON.stringify(values.OfficeAddress)
          );

          if (values.files.base64) {
            localStorage.setItem("Logo", JSON.stringify(values.files.base64));
          }

          window.scrollTo({ top: 0 });
          window.location.reload();
        } else if (res.data.ErrorCode === 100) {
          alert("Utilizator cu aceste date deja exista");
        }
      });
  };
  const { current_lang } = useContext(LayoutContext);

  return (
    <div>
      <Formik
        onSubmit={updateCompany}
        initialValues={updateCompanyValues}
        validationSchema={validationSchema}
        render={({ values, setFieldValue }) => {
          return (
            <Form style={{ marginTop: "50px" }}>
              <label htmlFor="BIC">
                {localization[current_lang].settings.BIC}
              </label>
              <div className="form-group" style={{ position: "relative" }}>
                <Field className="form-control" id="BIC" name={"BIC"} />
                <ErrorMessage name={"BIC"} component={TextError} />
              </div>
              <label htmlFor="Bank">Bank</label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="Bank"
                  name={"Bank"}
                />
                <ErrorMessage name={"Bank"} component={TextError} />
              </div>
              <label htmlFor="CommercialName">
                {localization[current_lang].settings.CommercialName}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="CommercialName"
                  name={"CommercialName"}
                />
                <ErrorMessage name={"CommercialName"} component={TextError} />
              </div>
              <label htmlFor="Email">
                {localization[current_lang].settings.Email}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="email"
                  className="form-control"
                  id="Email"
                  name={"Email"}
                  disabled={true}
                />
                <ErrorMessage name={"Email"} component={TextError} />
              </div>
              <label htmlFor="IBAN">
                {localization[current_lang].settings.IBAN}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="IBAN"
                  name={"IBAN"}
                />
                <ErrorMessage name={"IBAN"} component={TextError} />
              </div>
              <label htmlFor="IDNO">
                {localization[current_lang].settings.IDNO}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="IDNO"
                  name={"IDNO"}
                  disabled={true}
                />
                <ErrorMessage name={"IDNO"} component={TextError} />
              </div>
              <label htmlFor="JuridicalAddress">
                {localization[current_lang].settings.JuridicalAddress}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="JuridicalAddress"
                  name={"JuridicalAddress"}
                />
                <ErrorMessage name={"JuridicalAddress"} component={TextError} />
              </div>
              <label htmlFor="JuridicalName">
                {localization[current_lang].settings.JuridicalName}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="JuridicalName"
                  name={"JuridicalName"}
                />
                <ErrorMessage name={"JuridicalName"} component={TextError} />
              </div>
              <label htmlFor="OfficeAddress">
                {localization[current_lang].settings.OfficeAddress}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="OfficeAddress"
                  name={"OfficeAddress"}
                />
                <ErrorMessage name={"OfficeAddress"} component={TextError} />
              </div>
              <label htmlFor="VATCode">
                {localization[current_lang].settings.VATCode}
              </label>

              <div className="form-group" style={{ position: "relative" }}>
                <Field
                  type="text"
                  className="form-control"
                  id="VATCode"
                  name={"VATCode"}
                />
                <ErrorMessage name={"VATCode"} component={TextError} />
              </div>
              <label htmlFor="file">
                {localization[current_lang].settings.Logo}
              </label>

              <div className="form-group">
                {/*<input*/}
                {/*  id="file"*/}
                {/*  name="file"*/}
                {/*  type="file"*/}
                {/*  onChange={(event) => {*/}
                {/*    setFieldValue("file", event.currentTarget.files[0]);*/}
                {/*  }}*/}
                {/*  className="form-control"*/}
                {/*/>*/}
                <div className={"form-control"}>
                  <FileBase64
                    className="form-control"
                    name="file"
                    id={"file"}
                    multiple={false}
                    onDone={(files) => (values.files = files)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                {localization[current_lang].settings.ConfirmButton}
              </button>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default UpdateCompanyForm;
