import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lyrics from "../components/Lyrics";
import "./Live.css";

const Live = () => {
  const params = useParams();
  const event_id = params.id;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getEvent = () => {
      fetch(process.env.REACT_APP_APIURL + `/api/event/?id=${event_id}`, {})
        .then((response) => response.json())
        .then((data) => {
          setSongs(data.rows[0].songs);
        });
    };
    getEvent();
  }, []);

  return (
    <div className="live">
      {songs ? (
        songs.map((songId) => <Lyrics id={songId} />)
      ) : (
        <h1>No results</h1>
      )}
    </div>
  );
};

export default Live;
