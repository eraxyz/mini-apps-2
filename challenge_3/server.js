const express = require("express");
const db = require("./db/index");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client/dist"));
app.use(bodyParser.json());

app.get("/scoreboard", (req, res) => {
  db.getScores((err, scores) => {
    if (err) res.sendStatus(500);
    else res.send(scores);
  });
});

app.post("/addScore", (req, res) => {
  db.addToScoreboard(req.body, err => {
    console.log(err);
  });
  res.end();
});

app.listen(port, () => `Listening on port ${port}`);
