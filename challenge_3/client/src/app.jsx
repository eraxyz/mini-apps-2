import React from "react";
import KeyPad from "./Components/KeyPad.jsx";
import Scorecard from "./Components/Scorecard.jsx";
import OptionsBar from "./Components/OptionsBar.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      pinsLeft: 10,
      bowls: [],
      score: [],
      extraBowl: "inactive",
      scoreboard: []
    };
    this.handleKeyClick = this.handleKeyClick.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {
    fetch("/scoreboard")
      .then(response => response.json())
      .then(scoreboard =>
        this.setState({
          scoreboard
        })
      )
      .catch(err => console.error(err));
  }

  handleKeyClick(e) {
    const { bowls } = this.state;

    // strike on last frame
    if (bowls.length === 9 && e.target.textContent === "10") {
      bowls.push([Number(e.target.textContent)]);
      this.updateScore(bowls);
      // bowl on last frame
    } else if (bowls.length === 10) {
      bowls[9].push(Number(e.target.textContent));
      // extra bowl
      if (
        bowls[9].length !== 3 &&
        (e.target.textContent === "10" || bowls[9][0] + bowls[9][1] === 10)
      ) {
        this.updateScore(bowls, 10, "active");
        // 2nd bowl, no strike or spare or 3rd bowl
      } else {
        this.updateScore(bowls, 0);
      }
      // Second bowl in a frame
    } else if (bowls.length !== 0 && bowls[bowls.length - 1].length === 1) {
      bowls[bowls.length - 1].push(Number(e.target.textContent));
      this.updateScore(bowls);
      // Strike, not on last frame
    } else if (e.target.textContent === "10") {
      bowls.push([Number(e.target.textContent), 0]);
      this.updateScore(bowls);
      // Other number
    } else {
      bowls.push([Number(e.target.textContent)]);
      this.updateScore(bowls, 10 - Number(e.target.textContent));
    }
  }

  updateScore(bowls, pinsLeft = 10, extraBowl = "inactive") {
    const { score } = this.state;
    for (let i = 0; i < bowls.length; i++) {
      // break if frame only has 1 score or frame 10 and 2 scores with a strike or a spare
      if (
        bowls[i].length === 1 ||
        (i === 9 && bowls[i].length === 2 && bowls[i][0] + bowls[i][1] >= 10)
      ) {
        break;
      }
      // last frame and rolled strike or spare
      if (i === 9 && bowls[i][0] + bowls[i][1] >= 10 && bowls[i][2])
        score[i] = score[i - 1] + bowls[i][0] + bowls[i][1] + bowls[i][2];
      // strike and next bowl already rolled
      else if (
        bowls[i][0] === 10 &&
        bowls[i + 1] &&
        bowls[i + 1][1] !== undefined
      ) {
        // next bowl is not strike
        if (bowls[i + 1][0] !== 10)
          score[i] =
            (score[i - 1] || 0) +
            bowls[i][0] +
            bowls[i + 1][0] +
            bowls[i + 1][1];
        // next bowl is strike and bowl after that already rolled
        else if (bowls[i + 2])
          score[i] =
            (score[i - 1] || 0) +
            bowls[i][0] +
            bowls[i + 1][0] +
            bowls[i + 2][0];
        // next bowl is in last frame
        else if (i + 2 === 10 && bowls[9] && bowls[9][1] !== undefined) {
          score[i] =
            score[i - 1] + bowls[i][0] + bowls[i + 1][0] + bowls[i + 1][1];
        }
        // bowl is not a strike
      } else if (bowls[i][0] !== 10) {
        // spare is rolled and next bowl already rolled
        if (bowls[i][0] + bowls[i][1] === 10) {
          if (bowls[i + 1])
            score[i] =
              (score[i - 1] || 0) + bowls[i][0] + bowls[i][1] + bowls[i + 1][0];
          // no spare or strike OR spare but new bowl not rolled yet, score normally
        } else score[i] = (score[i - 1] || 0) + bowls[i][0] + bowls[i][1];
      }
    }

    this.setState({
      bowls,
      score,
      pinsLeft,
      extraBowl
    });

    if (score.length === 10 && pinsLeft === 0) this.addScore(bowls, score);
  }

  addScore(bowls, score) {
    const { name } = this.state;
    fetch("/addScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, bowls, score })
    });
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    const { pinsLeft, bowls, score, extraBowl } = this.state;
    return (
      <div>
        <h2>Bowling</h2>
        <OptionsBar handleChange={this.updateName} />
        <KeyPad keyClick={this.handleKeyClick} pinsLeft={pinsLeft} />
        <Scorecard
          frameCount={10}
          bowls={bowls}
          score={score}
          extraBowl={extraBowl}
        />
      </div>
    );
  }
}

export default App;
