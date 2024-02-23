import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditEvent.css";
import Songs from "./Songs";
import SongCard from "./SongCard";

const EditEvent = ({ id }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventSongs, setEventSongs] = useState([]);

  const getEvent = () => {
    fetch(process.env.REACT_APP_APIURL + `/api/event/?id=${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const event = data.rows[0];
        setName(event.event_type);
        setDate(event.event_date.substring(0, 10));
        setEventSongs(event.songs);
      });
  };

  useEffect(() => {
    getEvent();
  }, []);

  const fetchSong = async (songId) => {
    const res = await fetch(
      process.env.REACT_APP_APIURL + `/api/song/?id=${songId}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    return await data;
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = { id: id, name: name, date: date, songs: eventSongs };

    fetch(process.env.REACT_APP_APIURL + "/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });

    // console.log(response);
    // if (response.status === 200) {
    //   navigate("/");
    // }
  };

  const removeSong = (songId) => {
    const index = eventSongs.indexOf(songId);
    console.log(index);
    const oldArray = eventSongs;
    const newArray = oldArray.toSpliced(index, 1);
    console.log(newArray);
    setEventSongs(newArray);
  };

  const handleLive = () => {
    navigate(`/live/${id}`);
  };

  return (
    <div className="container">
      <form>
        <div className="top">
          <h1>Edit</h1>
          <button className="ctaBtn live_btn" onClick={handleLive}>
            See Live
          </button>
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
        <button onClick={handleSave} className="ctaBtn create_event_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
