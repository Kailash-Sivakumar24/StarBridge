import React from "react";
import { useNavigate } from "react-router-dom";
import RouterLink from "../reusable/RouterLink";
import HelperAvatar from "../reusable/HelperAvatar";
import "./homepage.css";
import starbridgeImg from "../../assets/img/Starbridge.png";
import backgroundHome from "../../assets/img/Background_Home.svg";

const HomePage = ({ setCompleted, completed }) => {
  const navigate = useNavigate();

  return (
    <div
      className="background-home"
      style={{ backgroundImage: `url(${backgroundHome})` }}
    >
      {/* <RouterLink className="btn-help" to="/help" label="?" /> */}
      <div className="container-home">
        <img className="img-logo" src={starbridgeImg} alt="Starbridge Logo" />
        {completed.length?<RouterLink className="btn-start" to="/map" label="Continue Playing" />:null}
        
        <button  className="btn-newstart" onClick={() => {
          setCompleted([]);
          navigate("/map");
        }} >New Game</button>
      </div>
      <HelperAvatar
        speechText={<RouterLink to="/help" label="Hi, welcome to Starbridge! Click here if you need help" />}
        timeOut={3600000}
      />
    </div>
  );
};

export default HomePage;
