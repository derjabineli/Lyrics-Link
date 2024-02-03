import React from "react";
import "./navbar.css";
import "./DashNav.css";
import image from "../images/temp.jpg";

function DashNavBar(props) {
  return (
    <nav>
      <a href="/">LyricsLink.</a>
      <ul>
        <li>
          <a href="http://localhost:3005/api/logout">Logout</a>
        </li>
        <li>
          {" "}
          <a href="/">
            <img
              src={props.userPhoto}
              alt="profile_photo"
              className="profilePhoto"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default DashNavBar;
