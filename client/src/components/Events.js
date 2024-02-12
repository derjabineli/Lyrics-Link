import React, { useEffect, useState } from "react";
import "./Events.css";
import Event from "./Event";
import NewEventModal from "./NewEventModal";

function Events() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    <>
      <NewEventModal open={showModal} onClose={() => setShowModal(false)} />
      <div className="container">
        <div className="events_header">
          <h1>Events</h1>
          <button
            className="ctaBtn events_button"
            onClick={() => setShowModal(true)}
          >
            Add New Event
          </button>
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
    </>
  );
}

export default Events;
