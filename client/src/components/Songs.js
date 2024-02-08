import React, { useEffect, useState } from "react";
import "./SongSearch.css";
import Song from "./Song";

function Songs() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  let searchTimer;

  const fetchSongs = async (search) => {
    if (search.length != 0) {
      setSearched(true);
    } else {
      setSearched(false);
    }

    fetch(`/api/songs?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.data);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    clearTimeout(searchTimer); // Clear the previous timer
    searchTimer = setTimeout(() => fetchSongs(value), 500); // Set a new timer
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
          {searched ? (
            results.length > 0 ? (
              results.map((song) => (
                <Song
                  id={song.id}
                  title={song.attributes.title}
                  author={song.attributes.author}
                />
              ))
            ) : (
              <h2>No Results</h2>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Songs;
