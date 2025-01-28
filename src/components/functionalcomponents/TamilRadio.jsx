import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../css/Radio.css";
import image1 from "../../assets/image4.jpg"

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("radio");
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    setupApi(stationFilter)
  }, [stationFilter]);

  const setupApi = async (filter) => {
    try {
      const searchTerm = filter === "all" ? "" : filter;
      const response = await fetch(
        `https://personalized-radio-station.onrender.com/api/stations?language=tamil&tag=${searchTerm}&limit=15`
        //  `http://localhost:5000/api/stations?language=english&tag=${searchTerm}&limit=15`
      );
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error.message);
    }
  };

  const filters = [
    "all",
    "kollywood",
    "devotional",
    "folk",
    "love"
  ];

  const setDefaultSrc = (event) => {
    event.target.src = image1; 
  };

  // Add station to custom playlist
  const addToPlaylist = (station) => {
    if (!playlist.find((item) => item.urlResolved === station.urlResolved)) {
      setPlaylist([...playlist, station]);
    }
  };

  // Remove station from custom playlist
  const removeFromPlaylist = (station) => {
    setPlaylist(playlist.filter((item) => item.urlResolved !== station.urlResolved));
  };

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>

      <h2>Stations</h2>
      <div className="stations">
        {stations &&
          stations.map((station, index) => (
            <div className="station" key={index}>
              <div className="stationName">
                <img
                  className="logo"
                  src={station.favicon}
                  alt="station logo"
                  onError={setDefaultSrc}
                />
                <div className="name">{station.name}</div>
              </div>

              <AudioPlayer
                className="player"
                src={station.urlResolved}
                showJumpControls={false}
                layout="stacked"
                customProgressBarSection={[]}
                customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                autoPlayAfterSrcChange={false}
              />

              <button
                className="add-to-playlist"
                onClick={() => addToPlaylist(station)}
              >
                Add to Playlist
              </button>
            </div>
          ))}
      </div>

      <h2>Custom Playlist</h2>
      <div className="playlist">
        {playlist.length > 0 ? (
          playlist.map((station, index) => (
            <div className="station" key={index}>
              <div className="stationName">
                <img
                  className="logo"
                  src={station.favicon}
                  alt="station logo"
                  onError={setDefaultSrc}
                />
                <div className="name">{station.name}</div>
              </div>

              <AudioPlayer
                className="player"
                src={station.urlResolved}
                showJumpControls={false}
                layout="stacked"
                customProgressBarSection={[]}
                customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                autoPlayAfterSrcChange={false}
              />

              <button
                className="remove-from-playlist"
                onClick={() => removeFromPlaylist(station)}
              >
                Remove from Playlist
              </button>
            </div>
          ))
        ) : (
          <p>Your playlist is empty. Add stations to your playlist!</p>
        )}
      </div>
    </div>
  );
};

export default Radio;
