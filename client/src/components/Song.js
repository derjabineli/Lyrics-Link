import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Song.css";

function Song({ id, title, author, link, setSongs }) {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {});

  const addSongToDB = async (songId) => {
    const token = await getAccessTokenSilently({});

    fetch(process.env.REACT_APP_APIURL + `/api/song/?id=${songId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        const songData = {
          id: songId,
          name: data.title,
          lyrics: data.data[0].attributes.lyrics,
        };
        const arrangementData = {
          id: data.data[0].id,
          song_name: data.title,
          chord_chart: data.data[0].attributes.chord_chart,
          chord_chart_key: data.data[0].attributes.chord_chart_key,
          has_chords: data.data[0].attributes.has_chords,
          lyrics: data.data[0].attributes.lyrics,
          song_id: songId,
          arrangement_name: data.data[0].attributes.name,
        };
        console.log(arrangementData);

        fetch(process.env.REACT_APP_APIURL + "/api/song", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(songData),
        }).then((res) => res);

        fetch(process.env.REACT_APP_APIURL + "/api/arrangement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(arrangementData),
        }).then((res) => res);

        setSongs((prevSongs) => [
          ...prevSongs,
          [parseFloat(id), parseFloat(data.data[0].id)],
        ]);
      });
  };

  const addSongToEvent = () => {
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
