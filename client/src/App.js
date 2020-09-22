import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Imports styles
import "./App.css";
//Import Pages
import Welcome from "./pages/welcome/Welcome.js";
import Login from "./pages/login/Login.js";
import Signup from "./pages/signup/Signup.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

export default function App() {
  useEffect(() => {
    checkFacebook();
  }, []);

  function checkFacebook() {
    if (window.location.hash && window.location.hash === "#_=_") {
      window.location.replace(window.location.href.split("%")[0]);
    }
  }

  return (
    <div className="routerWrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
