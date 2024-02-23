import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext, UserContextProvider } from "./context/UserContext";
import Login from "./routes/Login";
import DashBoard from "./routes/DashBoard";
import EventEdit from "./routes/EventEdit";
import NewEvent from "./routes/NewEvent";
import Live from "./routes/Live";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch(process.env.REACT_APP_APIURL + "/api/user")
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
