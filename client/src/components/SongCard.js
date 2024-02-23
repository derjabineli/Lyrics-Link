import React, { useEffect, useState } from "react";
import "./SongCard.css";

const SongCard = ({ fetchSong, removeSong, eventSongs, songId }) => {
  const [songData, setSongData] = useState({});
  console.log(songId);

  useEffect(() => {
    fetchSong(songId).then((data) => {
      setSongData(data);
    });
  }, [eventSongs]);

  return (
    <div className="songCard">
      <p
        className="songCard_close"
        onClick={() => {
          removeSong(songId);
        }}
      >
        &#x2715;
      </p>
      <p className="songCard_title">{songData.title}</p>
      {/* <p className="songCard_id">#{songData.data.id}</p> */}
    </div>
  );
};

export default SongCard;
