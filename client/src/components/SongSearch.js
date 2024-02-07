import React, { useEffect, useState } from "react";
import "./SongSearch.css";
import Event from "./Event";

function SongSearch() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents((oldArray) => [...data]);
      });
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className="container">
      <div className="events_header">
        <h1>Events</h1>
        <button className="ctaBtn events_button">Add New Event</button>
      </div>
      <div className="events">
        {events.map((service) => (
          <Event
            name={service.event_type}
            date={service.event_date.substring(0, 10)}
            songCount={service.songs.length}
          />
        ))}
      </div>
    </div>
  );
}

export default SongSearch;
