import React from "react";

const Scorecard = ({ frameCount, bowls, score, extraBowl }) => {
  const frames = [];

  const replaceNumbers = (frameBowls, index) => {
    if (frameBowls[0] === 10) {
      return index === 0 ? "X" : "";
    }

    if (index === 1 && frameBowls[0] + frameBowls[1] === 10) {
      return "/";
    }

    return frameBowls[index];
  };

  for (let i = 1; i <= frameCount; i++) {
    frames.push(
      <div className="frame" key={i}>
        <div className="frame-header">{i}</div>
        <div className="bowls-container">
          <div className="bowl1">
            {bowls[i - 1] !== undefined ? replaceNumbers(bowls[i - 1], 0) : ""}
          </div>
          <div className="bowl2">
            {bowls[i - 1] !== undefined ? replaceNumbers(bowls[i - 1], 1) : ""}
          </div>
          {i === frameCount ? (
            <div className={`bowl3 ${extraBowl}`}>
              {bowls[i - 1] !== undefined
                ? replaceNumbers(bowls[i - 1], 2)
                : ""}
            </div>
          ) : null}
        </div>
        <div className="score">{score[i - 1]}</div>
      </div>
    );
  }
  frames.push(
    <div className="frame" key={11}>
      <div className="frame-header">Total</div>
      <div className="score">{score[score.length - 1]}</div>
    </div>
  );

  return (
    <div>
      <h3>Scorecard</h3>
      <div className="main-scorecard-container">{frames}</div>
    </div>
  );
};

export default Scorecard;
