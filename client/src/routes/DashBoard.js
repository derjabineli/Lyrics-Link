import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DashNavBar from "../components/DashNavBar";
import Events from "../components/Events";

function DashBoard(props) {
  const userPhoto = props.user.attributes.photo_url;
  return (
    <div>
      <DashNavBar userPhoto={userPhoto} />
      <Events />
    </div>
  );
}

export default DashBoard;
