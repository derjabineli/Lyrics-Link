import React, { useEffect, useState } from "react";
import "./SongCard.css";

const SongCard = ({
  fetchSong,
  removeSong,
  songId,
  index,
  seteventSongs_new,
  eventSongs_new,
}) => {
  const [songData, setSongData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSong(songId[0]).then((data) => {
      console.log(data);
      setSongData(data);
      setLoading(false);
    });
  }, [fetchSong, songId]);

  return (
    !loading && (
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
        <div>
          <p>#{songId[0]}</p>
          <select
            name="arrangement"
            onChange={(e) => {
              const songs = eventSongs_new;
              songs[index][1] = e.target.value;
              seteventSongs_new(songs);
            }}
          >
            <option value="">--Arrangements--</option>
            {songData.data.map((arrangement) => {
              let matches = false;
              if (arrangement.id == songId[1]) {
                matches = true;
              }

              return (
                <option
                  value={arrangement.id}
                  selected={matches ? "selected" : ""}
                >
                  {arrangement.attributes.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    )
  );
};

export default SongCard;
