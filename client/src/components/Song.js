import React, { useEffect, useState } from "react";
import "./Song.css";

function Song({ id, title, author, link, setSongs }) {
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
