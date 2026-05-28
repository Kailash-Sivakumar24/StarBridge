import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RouterLink from "../reusable/RouterLink";
import data from "../../data/data";
import InteractionCircle from "./InteractionCircle";
import Stars from "../reusable/Stars";
import { countStarsInPlace } from "../../utils/starsCounting";
import HelperAvatar from "../reusable/HelperAvatar";
import "./placepage.css";
import place1 from "../../assets/img/places_backgrounds/Playground.png";

const images = { Playground: place1};
const PlacePage = ({ completed }) => {
  const { id } = useParams();
  const placeId = Number(id);
  const placeData = data.places.find(place => place.id === placeId);

  const style = {
    backgroundImage: `url(${images[placeData.text]})`,
    minHeight: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  const [speechText, setspeechText] = useState("");
  const { has, max } = countStarsInPlace(placeId, completed);
  useEffect(() => {
    let newMessage =
      has === 0
        ? `Welcome to ${placeData.text}, there are ${max} stars to collect here`
        : `Keep going, you're doing great!`;
    setspeechText(newMessage);
  }, [completed, has, max, placeData.text]);

  return (
    <div style={style}>
      <div className="hud">
        <RouterLink className="btn-back" to="/map" label="Go Back" />
        <span className="signpost">{placeData.text}</span>
        <span className="signpost stars-container">
          <Stars {...countStarsInPlace(placeId, completed)} />
        </span>
      </div>

      {placeData.interactions.map(interaction => (
        <InteractionCircle
          key={interaction.id}
          isUnlocked={has >= interaction.requiredStars}
          interaction={interaction}
          isCompleted={completed.includes(interaction.id)}
          setspeechText={setspeechText}
          localStarsAchieved={has}
        />
      ))}
      <HelperAvatar speechText={speechText} timeOut={5000} />
    </div>
  );
};

export default PlacePage;
