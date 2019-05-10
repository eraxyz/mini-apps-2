import React from "react";
import moment from "moment";

const OptionsBar = ({ coinSelect, startDate, endDate, dateSelect }) => {
  return (
    <div>
      <select onChange={coinSelect} id="coin-select">
        <option value="BTC">BTC</option>
        <option value="LTC">LTC</option>
        <option value="ETH">ETH</option>
        <option value="BCH">BCH</option>
        <option value="XRP">XRP</option>
      </select>
      <input
        type="date"
        id="start-date"
        defaultValue={moment(startDate * 1000).format("YYYY-MM-DD")}
        onChange={dateSelect}
      />
      <input
        type="date"
        id="end-date"
        defaultValue={moment(endDate * 1000).format("YYYY-MM-DD")}
        onChange={dateSelect}
      />
    </div>
  );
};

export default OptionsBar;
