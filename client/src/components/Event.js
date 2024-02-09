import React, { useState } from "react";
import "./Event.css";

function Event({ name, date, songCount }) {
  return (
    <div className="event">
      <h3>{name}</h3>
      <hr />
      <p>{date}</p>
      <p>{songCount} songs</p>
    </div>
  );
}

export default Event;
