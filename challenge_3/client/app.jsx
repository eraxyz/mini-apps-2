import React from "react";
import KeyPad from "./Components/KeyPad.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pinsLeft: 10,
      bowls: []
    };
    this.handleKeyClick = this.handleKeyClick.bind(this);
  }

  handleKeyClick(e) {
    const { bowls } = this.state;

    if (bowls.length !== 0 && bowls[bowls.length - 1].length === 1) {
      bowls[bowls.length - 1].push(Number(e.target.textContent));
      this.setState({
        bowls,
        pinsLeft: 10
      });
    } else if (e.target.textContent === "10") {
      bowls.push([Number(e.target.textContent), 0]);
      this.setState({
        bowls,
        pinsLeft: 10
      });
    } else {
      bowls.push([Number(e.target.textContent)]);
      this.setState({
        bowls,
        pinsLeft: 10 - Number(e.target.textContent)
      });
    }
  }

  render() {
    const { pinsLeft } = this.state;
    return (
      <div>
        <h2>Bowling</h2>
        <KeyPad keyClick={this.handleKeyClick} pinsLeft={pinsLeft} />
      </div>
    );
  }
}

export default App;
