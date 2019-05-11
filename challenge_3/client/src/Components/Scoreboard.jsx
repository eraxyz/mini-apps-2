import React from "react";
import Scorecard from "./Scorecard.jsx";

const Scoreboard = ({ scores, page }) => {
  return (
    <div>
      {scores.map((score, i) => (
        <div key={i}>
          <h4>{score.name}</h4>
          <Scorecard
            bowls={score.bowls}
            score={score.score}
            extraBowl="active"
          />
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
