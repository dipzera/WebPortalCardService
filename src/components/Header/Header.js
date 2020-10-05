import React, {useState} from 'react';
import logoSm from '../../assets/images/logo__2_-removebg-preview.png'
import axios from 'axios'

const Header = () => {


  const [ expanded, setExpanded ] = useState(false)

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-collapsed')
  }

  const toggleDropDown = (event) => {
    event.currentTarget.parentElement.classList.toggle('show')
    event.currentTarget.nextSibling.classList.toggle('show')

    setExpanded(!expanded)
  }

  const handleLanguageChange = (e) => {
    const dataLang = e.target.getAttribute('data-lang')
    const reqOption = {
      Language: dataLang,
      IDNO: JSON.parse(localStorage.getItem('IDNO')),
      CommercialName: JSON.parse(localStorage.getItem('CommercialName')),
      JuridicalName: JSON.parse(localStorage.getItem('JuridicalName')),
      Email: JSON.parse(localStorage.getItem('Email')),
      JuridicalAddress: JSON.parse(localStorage.getItem('JuridicalAddress')),
      OfficeAddress: JSON.parse(localStorage.getItem('OfficeAddress')),
      Bank: JSON.parse(localStorage.getItem('Bank')),
      IBAN: JSON.parse(localStorage.getItem('IBAN')),
      BIC: JSON.parse(localStorage.getItem('BIC')),
      VATCode: JSON.parse(localStorage.getItem('VATCode')),
      Logo: JSON.parse(localStorage.getItem('Logo')),
    }
    axios.post('https://api.edi.md/WebPortalCardService/json/UpdateCompany', reqOption)
      .then(res => {
        if (res.data.ErrorCode === 0) {
          localStorage.setItem('Language', JSON.stringify(dataLang))
          window.location.reload()
        } else {
          console.log(res.data)
        }
      })
  }

  return (

    <div className="header-section">
      {/* logo and logo icon start */}
      <div className="logo">
        <a href="javascript:">
        <span className="logo-img" style={{marginRight: '10px'}}>
            <img src={logoSm} alt="" height="40"/>
        </span>
          { /* <i class="fa fa-maxcdn"></i> */ }
          <span className="brand-name">IntelectSoft</span>
        </a>
      </div>

      {/* toggle button start*/}
      <a className="toggle-btn" onClick={() => toggleSidebar()}><i className="ti ti-menu"/></a>
      {/* toggle button end */}

      {/* mega menu start */}
      <div id="navbar-collapse-1" className="navbar-collapse collapse mega-menu">
        <ul className="nav navbar-nav">
          {/* classic drop down */}
          <li className="dropdown" >
            <a href="javascript:;" data-toggle="dropdown" className="" aria-expanded={expanded} onClick={toggleDropDown}>{JSON.parse(localStorage.getItem('Language')) === 'ru' ? 'Русский' : 'Română'} <i
              className="mdi mdi-chevron-down"/> </a>
            <ul role="menu" className="dropdown-menu language-switch" x-placement="bottom-start"
                style={{position: "absolute", transform: "translate3d(0px, 60px, 0px)", top: '0px', left: '0px', willChange: 'transform'}}>
              <li>
                <a tabIndex="-1" href="javascript:;" data-lang={JSON.parse(localStorage.getItem('Language')) === 'ru' ? 'ro' : 'ru'} onClick={handleLanguageChange}>{JSON.parse(localStorage.getItem('Language')) === 'ru' ? "Română" : 'Русский'}</a>
              </li>
            </ul>
          </li>
          {/* classic list */}
          <li>
            <form className="search-content" action="index.html" method="post">
              <input type="text" className="form-control mt-3" name="keyword" placeholder="Search..."/>
              <span className="search-button"><i className="ti ti-search"/></span>
            </form>
          </li>
        </ul>
      </div>
      {/* mega menu end */}

      <div className="notification-wrap">
        {/* right notification start*/}
        <div className="right-notification">
          <ul className="notification-menu">
            <li>
              <a href="javascript:;" className="notification" data-toggle="dropdown">
                <i className="mdi mdi-bell-outline"/>
                <span className="badge badge-success">4</span>
              </a>
              <ul className="dropdown-menu mailbox dropdown-menu-right">
                <li>
                  <div className="drop-title">Notifications</div>
                </li>
                <li className="notification-scroll">
                  <div className="message-center">
                    <a href="#">
                      <div className="user-img">
                        <i className="ti ti-star"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Jane A. Seward</h6>
                        <span className="mail-desc">Iwon meddle and...</span>
                      </div>
                    </a>
                    <a href="#">
                      <div className="user-img">
                        <i className="ti ti-heart"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Michael W. Salazar</h6>
                        <span className="mail-desc">Lovely gide learn for you...</span>
                      </div>
                    </a>
                    <a href="#">
                      <div className="user-img">
                        <i className="ti ti-image"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>David D. Chen</h6>
                        <span className="mail-desc">Send his new photo...</span>
                      </div>
                    </a>
                    <a href="#">
                      <div className="user-img">
                        <i className="ti ti-bell"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Irma J. Hendren</h6>
                        <span className="mail-desc">6:00 pm our meeting so...</span>
                      </div>
                    </a>
                  </div>
                </li>
                <li>
                  <a className="text-center bg-light" href="javascript:void(0);">
                    <strong>See all notifications</strong>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="javascript:;" className="notification" data-toggle="dropdown">
                <i className="mdi mdi-email-outline"/>
                <span className="badge badge-danger">9</span>
              </a>
              <ul className="dropdown-menu mailbox dropdown-menu-right">
                <li>
                  <div className="drop-title">New Messages 5</div>
                </li>
                <li className="notification-scroll">
                  <div className="message-center">
                    <a href="#">
                      <div className="user-img">
                        <img src="assets/images/users/avatar-2.jpg" alt="user" className="rounded-circle"/>
                        <span className="profile-status online pull-right"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Cassie T. Bishop</h6>
                        <span className="mail-desc">Just see the my admin!</span>
                        <span className="time">9:30 AM</span>
                      </div>
                    </a>
                    <a href="#">
                      <div className="user-img">
                        <img src="assets/images/users/avatar-3.jpg" alt="user" className="rounded-circle"/>
                        <span className="profile-status busy pull-right"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Rudy A. Scott</h6>
                        <span className="mail-desc">I've sung a song! See you at</span> <span
                        className="time">9:10 AM</span>
                      </div>
                    </a>
                    <a href="/">
                      <div className="user-img">
                        <img src="assets/images/users/avatar-4.jpg" alt="user" className="rounded-circle"/>
                        <span className="profile-status away pull-right"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Kevin D. Jernigan</h6>
                        <span className="mail-desc">I am a singer!</span>
                        <span className="time">9:08 AM</span>
                      </div>
                    </a>
                    <a href="/">
                      <div className="user-img">
                        <img src="assets/images/users/avatar-5.jpg" alt="user" className="rounded-circle"/>
                        <span className="profile-status offline pull-right"/>
                      </div>
                      <div className="mail-contnet">
                        <h6>Jane A. Seward</h6>
                        <span className="mail-desc">Just see the my admin!</span> <span
                        className="time">9:02 AM</span>
                      </div>
                    </a>
                  </div>
                </li>
                <li>
                  <a className="text-center bg-light" href="javascript:void(0);"> <strong>See all
                    notifications</strong> </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="javascript:" data-toggle="dropdown">
                <img src="assets/images/users/avatar-1.jpg" alt=""/>
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-menu">
                <a className="dropdown-item" href="#"><i
                  className="mdi mdi-account-circle m-r-5 text-muted"/> Profile</a>
                <a className="dropdown-item" href="#"><span className="badge badge-success pull-right">5</span><i
                  className="mdi mdi-settings m-r-5 text-muted"/> Settings</a>
                <a className="dropdown-item" href="#">
                  <i
                    className="mdi mdi-lock-open-outline m-r-5 text-muted"/> Lock screen</a>
                <a className="dropdown-item" href="#"><i className="mdi mdi-logout m-r-5 text-muted"/> Logout</a>
              </div>

            </li>

            <li>
              <div className="sb-toggle-right">
                <i className="mdi mdi-apps"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Header;