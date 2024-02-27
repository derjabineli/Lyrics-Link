import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditEvent.css";
import Songs from "./Songs";
import SongCard from "./SongCard";

const EditEvent = ({ user_id }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventSongs, setEventSongs] = useState([]);

  const handleCreate = async (e) => {
    const data = {
      name: name,
      date: date,
      songs: eventSongs,
      user_id: user_id,
    };

    const response = await fetch(process.env.REACT_APP_APIURL + "/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.status === 201) {
      navigate("/");
    }
  };

  const fetchSong = async (songId) => {
    const res = await fetch(`/api/song/?id=${songId}`, {
      method: "GET",
      credentials: "include",
    });
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

  return (
    <div className="container">
      <form>
        <div className="top">
          <h1>Create an Event</h1>
        </div>
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
        <input
          className="songs_input"
          name="songs"
          value={eventSongs}
          onChange={(e) => {
            setEventSongs(e.target.value);
          }}
        />
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
  );
};

export default EditEvent;
