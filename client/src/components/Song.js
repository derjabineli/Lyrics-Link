import React, { useEffect, useState } from "react";
import "./Song.css";

function Song({ id, title, author, link }) {
  return (
    <div className="song">
      <p className="song_title">{title}</p>
      <p className="song_author">{author}</p>
    </div>
  );
}

export default Song;
