import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditEvent.css";
import Songs from "./Songs";
import SongCard from "./SongCard";
import { useAuth0 } from "@auth0/auth0-react";

const EditEvent = ({ id }) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventSongs, seteventSongs] = useState([]);

  const getEvent = async () => {
    const token = await getAccessTokenSilently({
      scope: "read:users read:current_user read:user_idp_tokens",
    });

    fetch(process.env.REACT_APP_APIURL + `/api/event/?id=${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const event = data.rows[0];
        setName(event.event_type);
        setDate(event.event_date.substring(0, 10));
        seteventSongs(event.songs);
      });
  };

  useEffect(() => {
    try {
      getEvent();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(eventSongs);
  }, [eventSongs]);

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

  const handleSave = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently({
      scope: "read:users read:current_user read:user_idp_tokens",
    });

    const data = {
      id: id,
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
    seteventSongs(newArray);
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
        <Songs setSongs={seteventSongs} />
        <input
          className="songs_input"
          name="songs"
          value={eventSongs}
          onChange={(e) => {
            seteventSongs(e.target.value);
          }}
        />
        {eventSongs.length !== 0 && (
          <div className="event_songs">
            {eventSongs.map((songId, index) => (
              <SongCard
                key={songId}
                index={index}
                songId={songId}
                fetchSong={fetchSong}
                removeSong={removeSong}
                seteventSongs={seteventSongs}
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
