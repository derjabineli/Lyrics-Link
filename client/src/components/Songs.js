import React, { useEffect, useState } from "react";
import "./SongSearch.css";
import Song from "./Song";

function Songs(props) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  let searchTimer;

  const fetchSongs = async (search) => {
    const res = await fetch(`/api/songs?search=${search}`);
    const data = await res.json();
    setResults(data.data);

    if (search.length != 0) {
      setSearched(true);
    } else {
      setSearched(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchSongs(value), 500);
  };

  return (
    <div className="container">
      <div className="songs_header">
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
                  setSongs={props.setSongs}
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
