import React from "react";
import "./loginModal.css";

function loginModal() {
  const baseURL = process.env.REACT_APP_BASEURL;
  const clientID = process.env.REACT_APP_CLIENTID;
  const link = `https://api.planningcenteronline.com/oauth/authorize?client_id=${clientID}&redirect_uri=${baseURL}&response_type=code&scope=services people`;

  return (
    <div className="loginModal">
      <h2>Log In with Planning Center</h2>
      <a href={link} target="_blank" rel="noreferrer">
        <button className="loginButton ctaBtn">Login</button>
      </a>
    </div>
  );
}

export default loginModal;
