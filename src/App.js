import React from "react"
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { RecoveryPage } from "./pages/RecoveryPage"
import { Dashboard } from "./components/Dashboard/Dashboard"
import { Settings } from "./components/Settings/Settings"
import ErrorPage from "./pages/ErrorPage"
import history from "./util/history"
import AuthLayout from "./components/layout/AuthLayout"
import PublicLayout from "./components/layout/PublicLayout"
import ValidatePage from "./pages/ValidatePage"

const pages = [
  {
    exact: true,
    path: "/",
    component: () => <Redirect to={"/dashboard"} />,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/login",
    component: LoginPage,
    layout: PublicLayout, // can have more than one layout
  },
  {
    exact: true,
    path: "/register",
    component: RegisterPage,
    layout: PublicLayout, // can have more than one layout
  },
  {
    exact: true,
    path: "/recovery",
    component: RecoveryPage,
    layout: PublicLayout,
  },
  {
    exact: true,
    path: "/dashboard",
    component: Dashboard,
    layout: AuthLayout,
  },

  {
    exact: true,
    path: "/settings",
    component: Settings,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: '/validate/:token',
    component: ValidatePage,
    layout: PublicLayout
  }
]

const App = () => (
  <Router history={history}>
    <BrowserRouter basename={'/card'}>
      <Switch>
        {pages.map(
          ({ exact, path, component: Component, layout: Layout }, index) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={(props) => (
                <Layout history={props.history}>
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        )}
        <Route exact path={"*"} component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  </Router>
)

export default App
