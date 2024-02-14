import React, { useState, useEffect } from "react";
import Songs from "./Songs";

const EditEvent = ({ id }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventSongs, setEventSongs] = useState([]);

  useEffect(() => {
    const getEvent = () => {
      fetch(`/api/event/?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          const event = data.rows[0];
          setName(event.event_type);
          setDate(event.event_date.substring(0, 10));
          setEventSongs(event.songs);
        });
    };

    getEvent();
  }, []);

  const handleSave = async (e) => {
    const data = { id: id, name: name, date: date, songs: eventSongs };

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    // if (createdEvent.status === 201) {
    //   navigate("/");
    // }
  };

  return (
    <div className="container">
      <form>
        <h1>Create New Event</h1>
        <hr />
        <h2>Event Name</h2>
        <input
          className="event_name"
          type="text"
          name="name"
          id="event_type"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <h2>Date</h2>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <Songs setSongs={setEventSongs} />
        <input name="songs" value={eventSongs} />
        <br />
        <button onClick={handleSave} className="ctaBtn create_event_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
