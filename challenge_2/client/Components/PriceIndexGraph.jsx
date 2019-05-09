import React from "react";
import { Line } from "react-chartjs-2";

const PriceIndexGraph = ({ prices }) => {
  return (
    <div>
      <h2>Price Index (last 31 days)</h2>
      <Line data={prices} />
      <div>Powered by CoinDesk</div>
    </div>
  );
};

export default PriceIndexGraph;
