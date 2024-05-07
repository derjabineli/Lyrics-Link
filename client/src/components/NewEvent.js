import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./EditEvent.css";
import Songs from "./Songs";
import SongCard from "./SongCard";

const EditEvent = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventSongs, setEventSongs] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently({
      scope: "read:users read:current_user read:user_idp_tokens",
    });

    const data = {
      name: name,
      date: date,
      songs: JSON.stringify(eventSongs),
    };

    fetch(process.env.REACT_APP_APIURL + "/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/dashboard");
      }
    });
  };

  const fetchSong = async (songId) => {
    const token = await getAccessTokenSilently({
      scope: "read:users read:current_user read:user_idp_tokens",
    });

    const res = await fetch(
      process.env.REACT_APP_APIURL + `/api/song/?id=${songId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  const removeSong = (songId) => {
    const index = eventSongs.indexOf(songId);
    const oldArray = eventSongs;
    const newArray = oldArray.toSpliced(index, 1);
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
        {eventSongs.length !== 0 && (
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
