import React from "react";
import { useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { LayoutContext } from "./context";
import { scrollToTop } from "../../util/scrollToTop";
import axios from 'axios'

const AuthLayout = ({ children, history, path }) => {

  const current_lang = JSON.parse(
    localStorage.getItem("Language")
  ) === null ? 'ro' : JSON.parse(
    localStorage.getItem("Language")
  )

  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      history.push('/login')
    } else {
      history.push(path)
    }

  }, [localStorage.getItem('Token')]);


  useEffect(() => {
    axios.get(
      "https://api.edi.md/WebPortalCardService/json/TokenIsValid?",
      {
        params: {
          Token: JSON.parse(localStorage.getItem("Token")),
        },
      }
    )
      .then(res => {
        if(res.data['ErrorCode'] !== 0) {
          history.push('/login')
          window.location.reload()
        }
      })
  }, []);

  useEffect(() => {
    scrollToTop(document.querySelector(".scroll-up"));
    window.scrollTo({ top: 0 });

  }, []);

  return (
    <LayoutContext.Provider
      value={{
        current_lang,
      }}
    >
      <Sidebar />
      <div className={"body-content"}>
        <Header />
        <div className={"container-fluid"}> {children} </div>
        <div className="scroll-up active" />
      </div>
    </LayoutContext.Provider>
  );
};

export default AuthLayout;
