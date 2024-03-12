import React from "react";
import "./loginModal.css";
import { useAuth0 } from "@auth0/auth0-react";

function LoginModal() {
  const baseURL = process.env.REACT_APP_BASEURL;
  const clientID = process.env.REACT_APP_CLIENTID;

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="LoginModal">
      <h2>Log In with Planning Center</h2>
      <button
        className="loginButton ctaBtn"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  );
}

export default LoginModal;
