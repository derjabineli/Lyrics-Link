import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import "./navbar.css";
import "./DashNav.css";

function DashNavBar(props) {
  const { user, setUser } = useContext(UserContext);
  const { logout } = useAuth0();

  return (
    <nav>
      <a href="/dashboard">LyricsLink.</a>
      <ul>
        <li>
          <a onClick={logout}>Logout</a>
        </li>
        {props.userPhoto && (
          <li>
            {" "}
            <a href="/">
              <img
                src={user.attributes.photo_url}
                alt="profile_photo"
                className="profilePhoto"
              />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DashNavBar;
