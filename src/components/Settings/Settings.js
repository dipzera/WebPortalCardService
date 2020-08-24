import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UpdateCompanyForm from "./UpdateCompanyForm";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateApiKeyForm from "./UpdateAPIKeyForm";

export const Settings = () => {
  return (
    <>
      <div>
        <UpdateCompanyForm />
      </div>
      <div>
        <ChangePasswordForm />
      </div>
      <div>
        <UpdateApiKeyForm />
      </div>
    </>
  );
};
