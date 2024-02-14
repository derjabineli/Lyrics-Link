import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EventEdit = () => {
  const { id } = useParams();

  useEffect(() => {
    const getEvent = () => {
      const data = fetch(`/api/event/?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.rows[0]);
        });
    };

    getEvent();
  });

  return (
    <div>
      <h1>Events</h1>
    </div>
  );
};

export default EventEdit;
