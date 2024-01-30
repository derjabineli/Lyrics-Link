import React from "react";
import "./Login.css";
import LoginModal from "../components/LoginModal";
import NavBar from "../components/NavBar";

function Login() {
  return (
    <div className="Login">
      <NavBar />
      <main>
        <LoginModal />
      </main>
    </div>
  );
}

export default Login;
