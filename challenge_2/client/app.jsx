import React from "react";
import OptionsBar from "./Components/OptionsBar.jsx";
import moment from "moment";
import { Line } from "react-chartjs-2";
import ToggleButton from "react-toggle-button";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeCoin: "BTC",
      priceIndex: {},
      startDate: Math.round(Date.now() / 1000 - 2592000),
      endDate: Math.round(Date.now() / 1000),
      limit: 30,
      offlineMode: false
    };
    this.handleCoinSelect = this.handleCoinSelect.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
  }

  componentDidMount() {
    fetch(
      `/priceIndex?coin=BTC&limit=30&cached=false&endDate=${Math.round(
        Date.now() / 1000
      )}`
    )
      .then(response => response.json())
      .then(responseObj => {
        this.formatPriceIndex(responseObj.Data, "close", "BTC");
      })
      .catch(err => console.error(err));
  }

  formatPriceIndex(priceArr, measurement, coinName) {
    const { priceIndex } = this.state;
    const formatedObj = {
      labels: [],
      datasets: [{ label: `${coinName} - ${measurement}`, data: [] }]
    };

    priceIndex[coinName] = formatedObj;

    priceArr.forEach(priceObj => {
      formatedObj.datasets[0].data.push(priceObj[measurement]);
      formatedObj.labels.push(
        moment(new Date(priceObj.time * 1000)).format("MM/DD/YY")
      );
    });

    this.setState({
      priceIndex,
      activeCoin: coinName
    });
  }

  getCoinData(coinName) {
    const { limit, endDate, offlineMode } = this.state;
    fetch(
      `/priceIndex?coin=${coinName}&limit=${limit}&cached=${offlineMode}&endDate=${endDate}`
    )
      .then(response => response.json())
      .then(responseObj => {
        if (responseObj.Data)
          this.formatPriceIndex(responseObj.Data, "close", coinName);
        else window.alert("Data for this date range or coin is not cached.");
      })
      .catch(err => console.error(err));
  }

  handleCoinSelect(e) {
    if (!this.state.priceIndex[e.target.value]) {
      this.getCoinData(e.target.value);
    } else {
      this.setState({
        activeCoin: e.target.value
      });
    }
  }

  handleDateSelect(e) {
    const { startDate, endDate, activeCoin } = this.state;
    if (e.target.id === "end-date") {
      let limit = Date.parse(e.target.value) - startDate * 1000;
      limit = Math.floor(limit / (1000 * 60 * 60 * 24));
      if (limit < 0) {
        this.setState({
          endDate: Date.parse(e.target.value) / 1000
        });
      } else {
        this.setState(
          {
            limit,
            endDate: Date.parse(e.target.value) / 1000
          },
          this.getCoinData(activeCoin)
        );
      }
    } else {
      let limit = endDate * 1000 - Date.parse(e.target.value);
      limit = Math.floor(limit / (1000 * 60 * 60 * 24));
      if (limit < 0) {
        this.setState({
          startDate: Date.parse(e.target.value) / 1000
        });
      } else {
        this.setState(
          {
            limit,
            startDate: Date.parse(e.target.value) / 1000
          },
          this.getCoinData(activeCoin)
        );
      }
    }
  }

  render() {
    const {
      priceIndex,
      activeCoin,
      startDate,
      endDate,
      limit,
      offlineMode
    } = this.state;

    return (
      <div>
        <h2>Price Index (last {limit} days)</h2>
        <OptionsBar
          coinSelect={this.handleCoinSelect}
          startDate={startDate}
          endDate={endDate}
          dateSelect={this.handleDateSelect}
        />
        <ToggleButton
          value={offlineMode}
          onToggle={value => {
            this.setState({
              offlineMode: !value
            });
          }}
        />
        <Line data={priceIndex[activeCoin]} />
        <div>Powered by CoinDesk</div>
      </div>
    );
  }
}

export default App;
