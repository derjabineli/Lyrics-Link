import React from "react";
import "./loginModal.css";
import { useEffect } from "react";

function loginModal() {
  const handleLogin = () => {
    console.log("Log in");
  };

  return (
    <div className="loginModal">
      <h2>Log In with Planning Center</h2>
      <button className="loginButton ctaBtn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default loginModal;
