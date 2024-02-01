import React from "react";
import "./navbar.css";
import "./DashNav.css";
import image from "../images/temp.jpg";

function DashNavBar() {
  return (
    <nav>
      <a href="/">LyricsLink.</a>
      <ul>
        <li>
          {" "}
          <a href="/">Login</a>
        </li>
        <li>
          {" "}
          <a href="/">
            <img
              src="https://avatars.githubusercontent.com/u/69370608?v=4"
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
