import React, { useEffect, useState } from "react";
import "./SongSearch.css";

function Songs() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchSongs = async (search) => {
    fetch(`/api/songs?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setResults(data.data);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchSongs(value);
  };

  return (
    <div className="container">
      <div className="events_header">
        <h1>Songs</h1>
      </div>
      <div>
        <input
          className="song_searchbar"
          placeholder="Search for a Song"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Songs;
