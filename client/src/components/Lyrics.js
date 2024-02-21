import React, { useEffect, useState } from "react";
import ChordSheetJS from "chordsheetjs";
import { useParams } from "react-router-dom";
import "./Lyrics.css";

const Lyrics = ({ id }) => {
  const [songData, setSongData] = useState({});

  useEffect(() => {
    getLyrics();
  }, []);

  const getLyrics = () => {
    fetch(`http://localhost:3005/api/getSong/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSongData(data);
      });
  };

  return (
    <div style={{ "white-space": "pre-line" }} className="song">
      <h3 className="song_title">{songData.name}</h3>
      <div>{songData.lyrics}</div>
    </div>
  );
};

export default Lyrics;
