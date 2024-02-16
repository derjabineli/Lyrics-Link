import React from "react";
import "./Song.css";

function Song({ id, title, author, link, setSongs }) {
  // const handleCreate = async (e) => {
  //   const data = { name: name, date: date, songs: songs };

  //   const response = await fetch("/api/events", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "same-origin",
  //     body: JSON.stringify(data),
  //   });

  //   const result = await response.json();
  //   console.log(result);
  //   // if (createdEvent.status === 201) {
  //   //   navigate("/");
  //   // }
  // };

  const addSongToEvent = () => {
    setSongs((prevSongs) => [...prevSongs, id]);
  };

  return (
    <div onClick={addSongToEvent}>
      <div className="song">
        <div className="song_top">
          <p className="song_title">{title}</p>
          <p className="song_details">#{id}</p>
        </div>
        <p className="song_details">{author}</p>
      </div>
    </div>
  );
}

export default Song;
