import React, { useState, useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const TamilRadioApp = () => {
  const [stations, setStations] = useState([]);
  const [currentStream, setCurrentStream] = useState("");

  // Fetch Tamil radio stations
  useEffect(() => {
    const fetchTamilStations = async () => {
      const api = new RadioBrowserApi("TamilRadioApp");
      const tamilStations = await api.searchStations({
        language: "tamil",
        limit: 10, // Limit results
      });
      setStations(tamilStations);
    };
    fetchTamilStations();
  }, []);

  return (
    <div>
      <h1>Tamil Radio Stations</h1>
      <div className="station-list" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {stations.map((station, index) => (
          <div
            key={index}
            onClick={() => setCurrentStream(station.urlResolved)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              width: "200px",
            }}
          >
            <img
              src={station.favicon || "https://via.placeholder.com/150"}
              alt={station.name}
              style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{station.name}</h3>
            <p>{station.country}</p>
          </div>
        ))}
      </div>
      {currentStream && (
        <div style={{ marginTop: "20px" }}>
          <h2>Now Playing</h2>
          <AudioPlayer src={currentStream} autoPlay />
        </div>
      )}
    </div>
  );
};

export default TamilRadioApp;
