import React, { useEffect, useState } from "react";
import "./Lyrics.css";

const Lyrics = ({ id }) => {
  const [songData, setSongData] = useState({});

  useEffect(() => {
    getLyrics();
  }, []);

  const getLyrics = () => {
    fetch(
      process.env.REACT_APP_APIURL +
        `/api/getSong/?songId=${id[0]}&arrangementId=${id[1]}`,
      {}
    )
      .then((res) => res.json())
      .then((data) => {
        setSongData(data);
      });
  };

  return (
    <div style={{ "white-space": "pre-line" }} className="lyrics">
      <h3 className="lyric_name">{songData.song_name}</h3>
      <div>{songData.lyrics}</div>
    </div>
  );
};

export default Lyrics;
