const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
const APIKey = require("./CryptoCompareKey");
const axios = require("axios");

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

const getCryptoData = (coin, limit, endDate, callback) => {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=${limit}&toTs=${endDate}&api_key=${APIKey}`
    )
    .then(response => callback(response.data))
    .catch(err => console.error(err));
};

app.get("/priceIndex", (req, res) => {
  const { coin, limit, endDate, cached } = req.query;
  if (!coin || !limit || cached === undefined) {
    res.sendStatus(500);
  } else {
    client.get(`${coin}-${limit}-${endDate}`, (err, data) => {
      if (data === null && cached === "false") {
        getCryptoData(coin, limit, endDate, data => {
          res.send(data);
          client.set(`${coin}-${limit}-${endDate}`, JSON.stringify(data));
        });
      } else if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        res.send({ Data: null });
      }
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
