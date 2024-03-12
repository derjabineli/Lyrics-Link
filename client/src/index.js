import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-pf0jivnn8aes74k4.us.auth0.com"
    clientId="228BqOqoPonrBi1js4zJR4PMZPvBTHVE"
    useRefreshTokens
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_BASEURL,
      audience: process.env.REACT_APP_AUDIENCE,
      scope: "read:user read:users read:current_user read:user_idp_tokens",
    }}
  >
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Auth0Provider>
);
