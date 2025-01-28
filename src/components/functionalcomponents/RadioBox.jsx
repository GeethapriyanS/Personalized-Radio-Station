import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../css/Radio.css";
import image1 from "../../assets/image4.jpg";

const RadioBox = () => {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");

  useEffect(() => {
    fetchStations(stationFilter)
  }, [stationFilter]);

  const fetchStations = async (filter) => {
    try {
      const searchTerm = filter === "all" ? "" : filter;
      const response = await fetch(
        // `https://personalized-radio-station.onrender.com/api/stations?language=english&tag=${searchTerm}&limit=15`
        //  `http://localhost:5000/api/stations?language=english&tag=${searchTerm}&limit=15`
      );
      const data = await response.json();
      console.log(data);
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error.message);
    }
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = image1;
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
      <div className="stations">
        {stations.map((station, index) => (
          <div className="station" key={index}>
            <div className="stationName">
              <img
                className="logo"
                src={station.favicon || image1}
                alt="station logo"
                onError={setDefaultSrc}
              />
              <div className="name">{station.name.substring(0, 15)}</div>
            </div>
            <AudioPlayer
              className="player"
              src={station.urlResolved ||station.url}
              showJumpControls={false}
              layout="stacked"
              customProgressBarSection={[]}
              customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
              autoPlayAfterSrcChange={false}
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioBox;
