import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import EditEvent from "../components/EditEvent";
import DashNavBar from "../components/DashNavBar";
import { UserContext } from "../context/UserContext";

const EventEdit = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  let userPhoto;

  if (user) {
    userPhoto = user?.attributes?.photo_url;
  }

  return (
    <div>
      <DashNavBar userPhoto={userPhoto} />
      <EditEvent id={id} />
    </div>
  );
};

export default EventEdit;
