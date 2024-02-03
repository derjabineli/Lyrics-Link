import React from "react";
import "./Events.css";
import Event from "./Event";

function Events() {
  const services = [
    { name: "Small Group", date: "01-29-2024", songCount: 3 },
    { name: "Small Group", date: "02-03-2024", songCount: 4 },
    { name: "Small Group", date: "02-10-2024", songCount: 3 },
  ];

  return (
    <div className="container">
      <div className="events_header">
        <h1>Events</h1>
        <button className="ctaBtn events_button">Add New Event</button>
      </div>
      <div className="events">
        {services.map((service) => (
          <Event
            name={service.name}
            date={service.date}
            songCount={service.songCount}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;
