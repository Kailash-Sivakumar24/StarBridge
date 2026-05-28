import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import HelpPage from "./HelpPage/HelpPage";
import MapPage from "./MapPage/MapPage";
import PlacePage from "./PlacePage/PlacePage";
import InteractionPage from "./InteractionPage/InteractionPage";
import FourOFour from "./FourOFour/FourOFour";

function App() {
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );

  useEffect(() => {
    try {
      localStorage.setItem("completed", JSON.stringify(completed));
    } catch (error) {
      console.error(error);
    }
  }, [completed]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage setCompleted={setCompleted} completed={completed}/>
            }
          />
          <Route path="/help" element={<HelpPage />} />
          <Route
            path="/map"
            element={
              <MapPage completed={completed} setCompleted={setCompleted} />
            }
          />
          <Route
            path="/place/:id"
            element={
              <PlacePage
                completed={completed}
                setCompleted={setCompleted}
              />
            }
          />
          <Route
            path="/interaction/:id"
            element={
              <InteractionPage
                setCompleted={setCompleted}
              />
            }
          />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;