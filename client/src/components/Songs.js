import React, { useEffect, useState } from "react";
import "./SongSearch.css";
import Song from "./Song";

function Songs() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  let searchTimer;

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
    clearTimeout(searchTimer); // Clear the previous timer
    searchTimer = setTimeout(() => fetchSongs(value), 1000); // Set a new timer
  };

  return (
    <div className="container">
      <div className="events_header">
        <h1>Songs</h1>
      </div>
      <div className="songs_container">
        <input
          className="song_searchbar"
          placeholder="Search for a Song"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="song_results">
          {results.length > 0 ? (
            results.map((song) => (
              <Song
                id={song.id}
                title={song.attributes.title}
                author={song.attributes.author}
              />
            ))
          ) : (
            <h1>None</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Songs;
