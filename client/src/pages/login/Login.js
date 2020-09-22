import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import "./Login.css";
import { IconContext } from "react-icons";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();

  //SnackBar Error
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const login = () => {
    axios
      .post(
        `/api/login/local`,
        {
          username: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        history.push("/dashboard");
      })
      .catch((err) => {
        // error message
        if (
          err.response != null &&
          err.response.data != null &&
          err.response.data.message != null
        ) {
          handleOpen(true);
        }
      });
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Sign In</h1>
        </div>
        <div className="loginForm">
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setLoginEmail(e.target.value)}
          ></input>{" "}
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          ></input>{" "}
          <br />
          <button className="loginbtns orangeButton" onClick={login}>
            Login
          </button>
          <a href="/signup">
            <p>Create an Account</p>
          </a>
        </div>
        <div className="loginSubtext">
          <p>or</p>
        </div>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <div className="loginSocialBtns">
            <a href="/api/login/facebook">
              <button className="loginbtns facebookButton">
                <FaFacebook />
                Continue with Facebook
              </button>
            </a>{" "}
            <br />
            <a href="/api/login/google">
              <button className="loginbtns googleButton">
                <FcGoogle />
                Continue with Google
              </button>
            </a>
          </div>
        </IconContext.Provider>
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Unsuccessful login, please try again.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
