import React from "react";
import "./navbar.css";
import "./DashNav.css";

function DashNavBar(props) {
  return (
    <nav>
      <a href="/">LyricsLink.</a>
      <ul>
        <li>
          <a href={`${process.env.REACT_APP_APIURL}/api/logout`}>Logout</a>
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
