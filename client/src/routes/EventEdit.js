import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditEvent from "../components/EditEvent";
import DashNavBar from "../components/DashNavBar";

const EventEdit = (props) => {
  const { id } = useParams();
  const [eventObject, setEventObject] = useState({});

  const userPhoto = props.user.attributes.photo_url;

  useEffect(() => {
    const getEvent = () => {
      const data = fetch(`/api/event/?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setEventObject(data.rows[0]);
        });
    };

    getEvent();
  }, []);

  return (
    <div>
      <DashNavBar userPhoto={userPhoto} />
      <EditEvent event={eventObject} />
    </div>
  );
};

export default EventEdit;
