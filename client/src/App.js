import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Login from "./routes/Login";
import DashBoard from "./routes/DashBoard";
import EventEdit from "./routes/EventEdit";
import NewEvent from "./routes/NewEvent";
import Live from "./routes/Live";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { getAccessTokenSilently, loading, user, isAuthenticated } = useAuth0();
  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        try {
          const token = await getAccessTokenSilently({
            scope: "read:users read:current_user read:user_idp_tokens",
          });
          const response = await fetch(
            `${process.env.REACT_APP_APIURL}/api/user`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = await response.json();
          setUserContext(userData.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    getUser();
  }, [user, isAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Routes>
          {!isAuthenticated && <Route path="/" element={<Login />} />}
          {isAuthenticated && <Route path="/" element={<DashBoard />} />}
          {isAuthenticated && (
            <Route path="/dashboard" element={<DashBoard />} />
          )}
          {isAuthenticated && (
            <Route path="/event/:id/update" element={<EventEdit />} />
          )}
          {isAuthenticated && <Route path="/new" element={<NewEvent />} />}
          <Route path="/live/:id" element={<Live />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
