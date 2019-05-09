const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
const APIKey = require("./CryptoCompareKey");

const app = express();
const port = process.env.PORT || 3000;

client = redis.createClient();

client.on("error", err => {
  console.log("Error " + err);
});

client.on("ready", () => {
  console.log("Connected to redis");
});

app.use(express.static("public"));
app.use(bodyParser.json());

const getCryptoData = (coin, limit, callback) => {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=${limit}&api_key=${APIKey}`
    )
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

const checkRedis = (coin, limit, callback) => {
  client.get(`${coin}-${limit}`, callback);
};

app.get("/priceIndex", (req, res) => {
  if (req.query.coin && req.query.limit) {
    res.send(500);
  } else {
    checkRedis(req.query.coin, req.query.limit, (err, data) => {
      if (err) {
        getCryptoData(req.query.coin, req.query.limit, (err, data) => {
          if (err) {
            res.send(500);
          } else {
            res.send(data);
            client.set(`${coin}-${limit}`);
          }
        });
      } else {
        res.send(data);
      }
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
