import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import Login from "./routes/Login";
import DashBoard from "./routes/DashBoard";
import EventEdit from "./routes/EventEdit";
import NewEvent from "./routes/NewEvent";
import Live from "./routes/Live";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_APIURL + `/api/user`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data.data !== undefined) {
          setLoggedIn(true);
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Render a loading indicator or splash screen
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          {!loggedIn && <Route path="/" element={<Login />} />}
          {loggedIn && <Route path="/" element={<DashBoard />} />}
          {loggedIn && (
            <Route path="/event/:id/update" element={<EventEdit />} />
          )}
          {loggedIn && <Route path="/new" element={<NewEvent />} />}
          <Route path="/live/:id" element={<Live />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
