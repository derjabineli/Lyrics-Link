import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditEvent from "../components/EditEvent";
import DashNavBar from "../components/DashNavBar";

const EventEdit = (props) => {
  const { id } = useParams();

  const userPhoto = props.user.attributes.photo_url;

  return (
    <div>
      <DashNavBar userPhoto={userPhoto} />
      <EditEvent id={id} />
    </div>
  );
};

export default EventEdit;
