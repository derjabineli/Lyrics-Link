import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DashNavBar from "../components/DashNavBar";
import Events from "../components/Events";
import Songs from "../components/Songs";

function DashBoard(props) {
  const userPhoto = props.user.attributes.photo_url;
  return (
    <div>
      <DashNavBar userPhoto={userPhoto} />
      <Events />
      <Songs />
    </div>
  );
}

export default DashBoard;
