import React, { useState } from "react";
import "./NewEventModal.css";
import Songs from "./Songs.js";

const NewEventModal = ({ open, onClose }) => {
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
            id="name"
            required
          />
          <h2>Date</h2>
          <input type="date" id="date" />
          <Songs />
          <button className="ctaBtn create_event_btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;
