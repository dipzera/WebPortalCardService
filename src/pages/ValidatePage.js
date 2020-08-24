import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios'
import { NavLink } from "react-router-dom"
import logoSm2 from "../assets/images/is-logo-pic.png"

const ValidatePage = ({ history }) => {
  const [validateData, setValidateData] = useState(0)

  useLayoutEffect(() => {
    axios.get('https://api.edi.md/WebPortalCardService/json/ValidateRegistration?', {
      params: {
        TKey: history.location.pathname.replace('/validate/', '').toString()
      }
    })
      .then(res => {
        if (res.data) {
          setValidateData(res.data.ErrorCode)
        }
      })
  }, [])

  useEffect(() => {
    validateData === 0 && setTimeout(() => history.push('/login'), 3000)
  }, [])

  return (
    <>
      {validateData === 0  ? (
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
                              <b>Vă mulțumim pentru că ați ales IntelectSoft!</b>
                            </h5>
                            <p>Redirecționarea va avea loc în 3 secunde...</p>
                            <NavLink className={'btn btn-outline-success'} to={'/login'} role={"button"}>Logare</NavLink>
                            <b></b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : history.push('/404')}
    </>
  );
};

export default ValidatePage;