import React from "react";
import PriceIndexGraph from "./Components/PriceIndexGraph.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      priceIndex: {}
    };
  }

  componentDidMount() {
    fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then(response => response.json())
      .then(coindeskObj => this.formatPriceIndex(coindeskObj.bpi, "Bitcoin"))
      .then(priceIndex =>
        this.setState({
          priceIndex
        })
      )
      .catch(err => console.error(err));
  }

  //format for Line Chart
  formatPriceIndex(priceObj, cryptocurrencyName) {
    let priceData = [];
    for (let prop in priceObj) {
      priceData.push(priceObj[prop]);
    }
    return {
      labels: Object.keys(priceObj),
      datasets: [{ label: cryptocurrencyName, data: priceData }]
    };
  }

  render() {
    const { priceIndex } = this.state;

    return <PriceIndexGraph prices={priceIndex} />;
  }
}

export default App;
