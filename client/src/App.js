import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Login from "./routes/Login";
import DashBoard from "./routes/DashBoard";
import EventEdit from "./routes/EventEdit";
import Live from "./routes/Live";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        if (data.data != null) {
          setLoggedIn(true);
          setUser(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(loggedIn);
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>
            {!loggedIn && <Route path="/" element={<Login />} />}
            {loggedIn && <Route path="/" element={<DashBoard user={user} />} />}
            {loggedIn && (
              <Route
                path="/event/:id/update"
                element={<EventEdit user={user} />}
              />
            )}
            <Route path="/live/:id" element={<Live />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
