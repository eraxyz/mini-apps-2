import React from "react";

const KeyPad = ({ keyClick, pinsLeft }) => {
  const determineClassName = value =>
    value > pinsLeft || pinsLeft === 0
      ? "keypad-number disabled"
      : "keypad-number enabled";

  const determineClickEvent = value =>
    value > pinsLeft || pinsLeft === 0 ? null : keyClick;

  const numberKeyArray = [];
  for (let i = 0; i < 11; i++) {
    numberKeyArray.push(
      <div
        key={i}
        id={`key-${i}`}
        className={determineClassName(i)}
        onClick={determineClickEvent(i)}
      >
        {i}
      </div>
    );
  }

  return <div className="keypad-container">{numberKeyArray}</div>;
};

export default KeyPad;
