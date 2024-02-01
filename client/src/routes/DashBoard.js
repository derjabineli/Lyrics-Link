import React, { useEffect } from "react";
import "./Dashboard.css";
import DashNavBar from "../components/DashNavBar";

function DashBoard(props) {
  useEffect(() => {
    console.log(props.user);
  }, []);
  return (
    <div>
      <DashNavBar />
      <h1>Dashboard</h1>
    </div>
  );
}

export default DashBoard;
