import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import "./Signup.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Signup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
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

  //REGISTER CRUD
  const register = () => {
    axios
      .post(
        `/api/signup`,
        {
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
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
    <div className="signupWrapper">
      <div className="signupContainer">
        <div className="signupHeader">
          <h1>Create Account</h1>
        </div>
        <div className="signupForm">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setRegisterUsername(e.target.value)}
          ></input>{" "}
          <br />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          ></input>{" "}
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          ></input>{" "}
          <br />
          <button className="signupbtns orangeButton" onClick={register}>
            Register
          </button>
        </div>
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Unsuccessful register, please try again.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
