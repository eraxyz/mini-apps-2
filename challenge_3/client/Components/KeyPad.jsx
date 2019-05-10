import React from "react";

const KeyPad = ({ keyClick, pinsLeft }) => {
  const determineClassName = value =>
    value > pinsLeft ? "keypad-number disabled" : "keypad-number enabled";

  const determineClickEvent = value => (value > pinsLeft ? null : keyClick);

  const numberKeyArray = [];
  for (let i = 1; i < 11; i++) {
    numberKeyArray.push(
      <div className={determineClassName(i)} onClick={determineClickEvent(i)}>
        {i}
      </div>
    );
  }

  return <div className="keypad-container">{numberKeyArray}</div>;
};

export default KeyPad;
