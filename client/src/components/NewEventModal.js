import React, { useState } from "react";
import "./NewEventModal.css";
import Songs from "./Songs.js";
import SongCard from "./SongCard.js";

const NewEventModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventSongs, setEventSongs] = useState([]);

  const handleCreate = async (e) => {
    const data = { name: name, date: date, songs: eventSongs };

    const response = await fetch(process.env.REACT_APP_APIURL + "/api/events", {
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

  const fetchSong = async (songId) => {
    const res = await fetch(`/api/song/?id=${songId}`);
    const data = await res.json();
    return await data;
  };

  const removeSong = (songId) => {
    const index = eventSongs.indexOf(songId);
    console.log(index);
    const oldArray = eventSongs;
    const newArray = oldArray.toSpliced(index, 1);
    console.log(newArray);
    setEventSongs(newArray);
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
          <Songs setSongs={setEventSongs} />
          <input className="songs_input" name="songs" value={eventSongs} />
          {eventSongs.length != 0 && (
            <div className="event_songs">
              {eventSongs.map((songId) => (
                <SongCard
                  songId={songId}
                  fetchSong={fetchSong}
                  removeSong={removeSong}
                  eventSongs={eventSongs}
                />
              ))}
            </div>
          )}
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
