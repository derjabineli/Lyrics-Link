import React, { useEffect, useState } from "react";
import "./Song.css";

function Song({ id, title, author, link, setSongs }) {
  useEffect(() => {});

  const addSongToDB = async (songId) => {
    fetch(process.env.REACT_APP_APIURL + `/api/song/?id=${songId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        const postData = {
          id: songId,
          name: data.title,
          lyrics: data.data.attributes.lyrics,
          chord_chart: data.data.attributes.chord_chart,
          chord_chart_key: data.data.attributes.chord_chart_key,
        };

        fetch(process.env.REACT_APP_APIURL + "/api/song", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(postData),
        }).then((res) => console.log(res));
      });
  };

  const addSongToEvent = () => {
    setSongs((prevSongs) => [...prevSongs, id]);
    addSongToDB(id);
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
