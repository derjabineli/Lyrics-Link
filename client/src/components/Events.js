import React, { useEffect, useState } from "react";
import "./Events.css";
import Event from "./Event";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_APIURL + "/api/events", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents((oldArray) => [...data]);
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="events_header">
          <h1>Events</h1>
          <a href="/new">
            <button className="ctaBtn events_button">Add New Event</button>
          </a>
        </div>
        <div className="events">
          {events.map((service) => (
            <a href={`event/${service.id}/update`} className="events_link">
              <Event
                key={service.id}
                id={service.id}
                name={service.event_type}
                date={service.event_date.substring(0, 10)}
                songCount={service.songs.length}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
