import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import DashBoard from "./routes/DashBoard";

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
      <Router>
        <Routes>
          {!loggedIn && <Route path="/login" element={<Login />} />}
          {loggedIn && <Route path="/" element={<DashBoard user={user} />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
