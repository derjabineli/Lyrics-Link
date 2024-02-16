import React, { useContext } from "react";
import "./Dashboard.css";
import { UserContext } from "../context/UserContext";
import DashNavBar from "../components/DashNavBar";
import Events from "../components/Events";

function DashBoard(props) {
  const { user, setUser } = useContext(UserContext);
  const userPhoto = user.attributes.photo_url;
  return (
    <div>
      <DashNavBar userPhoto={userPhoto} />
      <Events />
    </div>
  );
}

export default DashBoard;
