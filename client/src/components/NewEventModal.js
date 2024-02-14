import React, { useState } from "react";
import "./NewEventModal.css";
import Songs from "./Songs.js";

const NewEventModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [songs, setSongs] = useState([]);

  const handleCreate = async (e) => {
    const data = { name: name, date: date, songs: songs };

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

  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal_container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <Songs setSongs={setSongs} />
          <input name="songs" value={songs} />
          <br />
          <button onClick={handleCreate} className="ctaBtn create_event_btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;
