import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import { UserContext } from "../context/UserContext";
import DashNavBar from "../components/DashNavBar";
import Events from "../components/Events";
import { useAuth0 } from "@auth0/auth0-react";

function DashBoard(props) {
  return (
    <div>
      <DashNavBar />
      <Events />
    </div>
  );
}

export default DashBoard;
