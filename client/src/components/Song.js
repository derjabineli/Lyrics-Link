import React, { useEffect, useState } from "react";
import "./Song.css";

function Song({ id, title, author, link, setSongs }) {
  const addSongToEvent = () => {
    setSongs((prevSongs) => [...prevSongs, id]);
  };

  return (
    <div onClick={addSongToEvent}>
      <div className="song">
        <p className="song_title">{title}</p>
        <p className="song_author">{author}</p>
      </div>
    </div>
  );
}

export default Song;
