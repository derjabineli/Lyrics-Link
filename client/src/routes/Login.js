import React from "react";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="Login">
      <NavBar />
      <main>
        <div className="LoginModal">
          <h2>Log In with Planning Center</h2>
          <button className="loginButton ctaBtn" onClick={loginWithRedirect}>
            Login
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
