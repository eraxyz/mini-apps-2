const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Bowling", {
  useNewUrlParser: true
});

const scoreboardSchema = mongoose.Schema({
  name: String,
  bowls: Array,
  score: [Number]
});

const Scoreboard = mongoose.model("Bowling", scoreboardSchema);

const addToScoreboard = ({ name, bowls, score }, callback) => {
  const scoreEntry = new Scoreboard({
    name,
    bowls,
    score
  });

  scoreEntry.save(callback);
};

const getScores = callback => {
  Scoreboard.find({}, null, { limit: 30 }, callback);
};

module.exports.addToScoreboard = addToScoreboard;
module.exports.getScores = getScores;
