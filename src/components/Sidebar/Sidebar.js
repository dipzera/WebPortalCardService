import React, {useContext} from "react"
import avatar from '../../assets/images/users/avatar-1.jpg'
import logout from '../../assets/images/logout.svg';
import dashboard from '../../assets/images/dashboard.svg';
import download from '../../assets/images/download.svg';
import upload from '../../assets/images/upload.svg';
import settings from '../../assets/images/settings.svg';
import {NavLink, useHistory} from "react-router-dom"
import {localization} from "../../util/localization"
import {LayoutContext} from "../layout/context"


export const Sidebar = () => {
  const { current_lang } = useContext(LayoutContext)
  return (
    <>
      {/* sidebar left start*/}
      <div className="sidebar-left">
        <div className="sidebar-left-info">

          <div className="user-box">
            <div className="d-flex justify-content-center">
              <img src={JSON.parse(localStorage.getItem('Logo'))} alt="" className="img-fluid rounded-circle"/>
            </div>
            <div className="text-center text-white mt-2">
              <h6>{JSON.parse(localStorage.getItem('CommercialName')) || 'Commercial Name'}</h6>
              <p className="text-muted m-0">Admin</p>
            </div>
          </div>

          {/* sidebar nav start */}
          <ul className="side-navigation">
            <li>
              <h3 className="navigation-title">Navigation</h3>
            </li>
            <li className="menu-list">
              <NavLink className="menu-list__link" activeClassName={'active'} to={'/dashboard'}><img src={dashboard} className="mdi mdi-gauge sidebar-icon" alt={''}/> <span>{localization[current_lang].sidebar.Dashboard}</span></NavLink>
            </li>
            <li className="menu-list"><NavLink className="menu-list__link" activeClassName={'active'} to={'/settings'}><img src={settings} className="mdi mdi-chart-arc sidebar-icon" alt={''}/> <span>{localization[current_lang].sidebar.Settings} </span></NavLink>
            </li>
            <li className="menu-list"><NavLink to={'/login'}><img src={logout} className="mdi mdi-email sidebar-icon" alt={''}/><span>{localization[current_lang].sidebar.Logout} </span></NavLink>
            </li>
          </ul>
          {/* sidebar nav end */}
        </div>
      </div>
      {/* sidebar left end */}


    </>
  )
}