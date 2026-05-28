import React, { useState, useRef } from "react";
import RouterLink from "../reusable/RouterLink";
import "./helppage.css";
import background from "../../assets/img/interactions_backgrounds/Town.svg";

const HelpPage = props => {
  const [play, setPlay] = useState(true);
  const videoEl = useRef();

  const togglePlay = () => {
    if (play) {
      videoEl.current.pause();
      setPlay(false);
    } else {
      videoEl.current.play();
      setPlay(true);
    }
  };

  return (
    <div className="background-help" style={{backgroundImage:`url(${background})`}}>
      <br />
      <RouterLink className="btn-back" to="/" label="Go Back" />
      <div className="video-container">
        <video ref={videoEl} className="video-player" alt="Help video player" autoPlay loop >
          <source src="/StarbridgeHelper.webm" type="video/webm" />
        </video>
        <button
          onClick={togglePlay}
          className={`btn-play ${play ? 'play' : 'pause'}`} >
          {play ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default HelpPage;
