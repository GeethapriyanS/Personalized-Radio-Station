import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../css/Radio.css";
import image1 from "../../assets/image4.jpg"

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("radio");
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "Tamil Radio App", true);
    api.getBaseUrl = "https://all.api.radio-browser.info";
    const stations = await api
      .searchStations({
        language: "tamil", // Fetch Tamil stations
        tag: stationFilter === "all" ? "" : stationFilter, // Apply filter
        limit: 30,
      })
      .then((data) => data);

    return stations;
  };

  const filters = [
    "all",
    "kollywood",
    "devotional",
    "folk",
    "love",
    "all",
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
