import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./SongCard.css";

const SongCard = ({
  fetchSong,
  removeSong,
  songId,
  index,
  eventSongs,
  seteventSongs,
}) => {
  const [songData, setSongData] = useState({});
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setLoading(true);
    fetchSong(songId[0]).then((data) => {
      setSongData(data);
      setLoading(false);
    });
    console.log(songData);
  }, [fetchSong, songId]);

  const changeArrangement = async (e) => {
    const token = await getAccessTokenSilently({
      scope: "read:users read:current_user read:user_idp_tokens",
    });

    const songs = eventSongs;
    songs[index][1] = e.target.value;
    seteventSongs(songs);

    const arrangement = songData.data.find(
      (element) => element.id == e.target.value
    );

    const arrangementData = {
      id: arrangement.id,
      song_name: songData.title,
      chord_chart: arrangement.attributes.chord_chart,
      chord_chart_key: arrangement.attributes.chord_chart_key,
      has_chords: arrangement.attributes.has_chords,
      lyrics: arrangement.attributes.lyrics,
      song_id: songId[0],
      arrangement_name: arrangement.attributes.name,
    };

    fetch(process.env.REACT_APP_APIURL + "/api/arrangement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(arrangementData),
    }).then((res) => res);
  };

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
              changeArrangement(e);
            }}
          >
            {/* {songData.data.map((arrangement) => {
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
            })} */}
          </select>
        </div>
      </div>
    )
  );
};

export default SongCard;
