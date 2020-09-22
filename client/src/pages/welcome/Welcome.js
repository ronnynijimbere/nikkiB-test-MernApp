import React from "react";
import "../../App.css";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcomeWrapper">
      <div className="welcomeContainer">
        <div className="welcomeHeader">
          <h1>Welcome</h1>
        </div>
        <div className="welcomeSubtext">
          <p>
            Keep your daily tasks in order with <br />
            <br />
            Task-Manager
          </p>
        </div>
        <a href="/login">
          <button className="welcomebtn orangeButton">Proceed to Login</button>
        </a>
      </div>
    </div>
  );
}
