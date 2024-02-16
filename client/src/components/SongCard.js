import React, { useEffect, useState } from "react";
import "./SongCard.css";

const SongCard = (props) => {
  const [songData, setSongData] = useState({});
  useEffect(() => {
    props.fetchSong(props.id).then((data) => {
      setSongData(data);
    });
  }, [props.eventSongs]);

  return (
    <div className="songCard">
      <p
        className="songCard_close"
        onClick={() => {
          props.removeSong(props.id);
        }}
      >
        &#x2715;
      </p>
      <p className="songCard_title">{songData.title}</p>
      <p className="songCard_id">#{songData.data.id}</p>
    </div>
  );
};

export default SongCard;
