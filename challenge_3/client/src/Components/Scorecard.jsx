import React from "react";

const Scorecard = ({ bowls, score, extraBowl }) => {
  const frames = [];

  const replaceNumbers = (frame, frameBowls, index) => {
    if (frame === 10 && frameBowls[index] === 10) {
      return "X";
    }

    if (frameBowls[0] === 10 && frame !== 10) {
      return index === 0 ? "X" : "";
    }

    if (index === 1 && frameBowls[0] + frameBowls[1] === 10) {
      return "/";
    }

    return frameBowls[index];
  };

  for (let i = 1; i <= 10; i++) {
    frames.push(
      <div className="frame" key={i}>
        <div className="frame-header">{i}</div>
        <div className="bowls-container">
          <div className="bowl1">
            {bowls[i - 1] !== undefined
              ? replaceNumbers(i, bowls[i - 1], 0)
              : ""}
          </div>
          <div className="bowl2">
            {bowls[i - 1] !== undefined
              ? replaceNumbers(i, bowls[i - 1], 1)
              : ""}
          </div>
          {i === 10 ? (
            <div className={`bowl3 ${extraBowl}`}>
              {bowls[i - 1] !== undefined
                ? replaceNumbers(i, bowls[i - 1], 2)
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
      <div className="main-scorecard-container">{frames}</div>
    </div>
  );
};

export default Scorecard;
