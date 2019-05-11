import React from "react";

const OptionsBar = ({ handleChange }) => {
  return (
    <div>
      <label htmlFor="name-input">Enter your name: </label>
      <input id="name-input" type="text" onChange={handleChange} />
    </div>
  );
};

export default OptionsBar;
