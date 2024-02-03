import React from "react";
import "./Event.css";

function Event({ name, date, songCount }) {
  return (
    <div
      className="event"
      onClick={() => {
        console.log("Clicked!!");
      }}
    >
      <h3>{name}</h3>
      <hr />
      <p>{date}</p>
      <p>{songCount} songs</p>
    </div>
  );
}

export default Event;
